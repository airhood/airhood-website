// git에 커밋하기엔 너무 큰 보고서 PDF를 빌드 전에 GitHub Release에서 내려받는다.
// (git 100MB 제한 회피 + 배포 시 동일 출처로 서빙되어 CORS 문제 없음)
import { existsSync, mkdirSync, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import path from 'node:path';

const LARGE_ASSETS = [
  {
    url: 'https://github.com/airhood/airhood-website/releases/download/reports/FTC.-.pdf',
    dest: 'public/reports/pullobot.pdf',
  },
  {
    url: 'https://github.com/airhood/airhood-website/releases/download/reports/VLA.-.pdf',
    dest: 'public/reports/vla-disaster-response.pdf',
  },
];

async function fetchAsset({ url, dest }) {
  if (existsSync(dest)) {
    console.log(`[fetch-large-reports] skip (already exists): ${dest}`);
    return;
  }
  mkdirSync(path.dirname(dest), { recursive: true });
  console.log(`[fetch-large-reports] fetching ${url}`);
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok || !res.body) {
    throw new Error(`[fetch-large-reports] failed to fetch ${url}: ${res.status}`);
  }
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  console.log(`[fetch-large-reports] done: ${dest}`);
}

for (const asset of LARGE_ASSETS) {
  await fetchAsset(asset);
}
