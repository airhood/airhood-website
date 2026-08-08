---
name: add-project
description: Add a new entry (project, competition, or research report) to the Airhood portfolio site's unified Projects list. Use whenever the user gives a local file path (PDF/DOCX) or asks to add/register a project, study, competition entry, or report to this site.
---

# Add a project / report entry

This site (`src/data/index.ts`, `projects` array) merges software projects, competitions,
and research reports into one unified list. Each entry is one object matching the
`Project` interface in `src/types/index.ts`:

```ts
interface Project {
  slug: string;            // kebab-case, unique, used in URL /projects/<slug>
  title: string;
  description: string;
  tags: string[];          // 3-4 English keywords, Capitalized ('Deep Learning', 'Chemistry')
  date?: string;            // '2025' or '2024 ~ 2025'
  organization?: string;    // competition/exhibition/org name — omit if none
  type?: 'competition' | 'research';
  githubUrl?: string;
  liveUrl?: string;
  pdf?: string | string[]; // '/reports/<slug>.pdf', or multiple (paper + slides)
}
```

## Steps when given a source file (PDF or DOCX)

1. **Convert if DOCX**: `soffice --headless --convert-to pdf --outdir <scratchpad> "<file>"`
   (LibreOffice preserves embedded equations/formatting far better than a text-based
   conversion — always use it, not python-docx/pandoc.)

2. **Extract title + context**: `pdftotext -f 1 -l 2 "<file>" -` for the title, then read a
   few more pages (`pdftotext -f <n> -l <m> "<file>" -` or `grep -iE "keyword"`) to
   understand the actual method/algorithm used before writing the description. Don't
   guess from the title alone — the site's descriptions are specific (e.g. "MCTS 기반
   탐색 알고리즘을 설계·개선해", not "게임 AI를 만드는 탐구").

3. **Check file size** — `ls -la "<file>"` — this decides hosting:
   - **< ~90MB**: copy directly into `public/reports/<slug>.pdf`. It gets committed to
     git normally.
   - **>= ~90MB** (git hard-blocks pushes over 100MB, and PDFs this large shouldn't live
     in the repo anyway): use the GitHub Release path instead — see
     "Large file hosting" below. Do **not** just copy it into `public/reports/`.

4. **Decide `organization`**: set it only if the file is genuinely tied to a named
   contest/exhibition (e.g. `전국과학전람회`, `R&E`, `코리아로봇챔피언십`). Personal/club
   explorations with no formal contest get no `organization` field — same pattern as
   `van-der-waals-equation` or `time-series-self-independence`.

5. **Decide `type`**: set `type: 'research'` for individual/team academic research —
   **this includes items that also have an `organization`** (e.g. R&E, 과학전람회 entries
   are still research, not "competitions" in the robotics-contest sense). Only leave
   `type` unset for genuine build/robotics contests (PulloBot-style) or plain software
   projects with no organization at all.

   ⚠️ **Icon bug history**: `src/components/common/ProjectIcon.tsx` picks flask (research)
   vs trophy (competition) vs code (plain project) by checking `type` **first**, falling
   back to "has organization? trophy : code" only when `type` is unset. Never assume
   "no organization → code icon" — always set `type: 'research'` explicitly on research
   entries even when there's no organization, or the icon will be wrong.

6. **Write the entry** into the `projects` array in `src/data/index.ts`. Array order =
   display order (home preview shows the first 3, `/projects` shows all) — insert where
   the user asks, or near same-date neighbors if unspecified.

7. **Multiple files for one entry** (e.g. paper + slide deck): use `pdf: [file1, file2]`
   — array order is render order (first renders on top). Don't duplicate the whole
   project entry.

8. **Verify**: `npx tsc --noEmit` (must be silent), then check in the browser —
   dev server is normally already running at `http://localhost:5173`; if not,
   `npm run dev -- --port 5173` in the background. Check both `/projects` (card grid,
   icon/tags/banner) and `/projects/<slug>` (full detail + PDF renders).

9. **Do not `git commit` unless the user explicitly asks.**

## Large file hosting (>= ~90MB)

Git hard-blocks any file over 100MB, and even under that, committing huge PDFs bloats
the repo. Large report PDFs are hosted as GitHub Release assets instead, fetched at
build time so they end up served same-origin (avoids CORS — GitHub Release assets have
no `Access-Control-Allow-Origin` header, so react-pdf's `fetch()` fails if pointed at
the raw `github.com/.../releases/download/...` URL directly).

1. Upload (creates the `reports` release once if it doesn't exist yet):
   ```
   gh release create reports --title "Report Assets" --notes "대용량 보고서 PDF 호스팅용" \
     -R airhood/airhood-website   # only if the release doesn't already exist
   gh release upload reports "<file>" --clobber -R airhood/airhood-website
   ```
2. Get the asset's stable download URL:
   ```
   gh release view reports -R airhood/airhood-website --json assets
   ```
   Use the `url` field (`https://github.com/airhood/airhood-website/releases/download/reports/<name>`).
3. Add an entry to the `LARGE_ASSETS` array in `scripts/fetch-large-reports.mjs`:
   ```js
   { url: '<that url>', dest: 'public/reports/<slug>.pdf' }
   ```
4. Add `public/reports/<slug>.pdf` to `.gitignore`.
5. In `data/index.ts`, still reference the **local** path: `pdf: '/reports/<slug>.pdf'`
   — never the raw GitHub URL directly.
6. Run `node scripts/fetch-large-reports.mjs` once locally to pull it down for dev/testing
   (it's a no-op on repeat runs — skips files that already exist).

This script also runs automatically via the `predev`/`prebuild` npm hooks, so a fresh
clone or Vercel deploy fetches these files itself — nothing large ever touches git.

## Reordering existing entries

The user may ask to reorder cards — that's just reordering objects in the `projects`
array in `src/data/index.ts` (`grep -n "slug: '" src/data/index.ts` to find them
quickly). No other file controls display order.
