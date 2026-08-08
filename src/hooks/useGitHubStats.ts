import { useEffect, useState } from 'react';

export interface LanguageStat {
  name: string;
  count: number;
  percent: number;
}

export interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  followers: number;
  following: number;
  topLanguages: LanguageStat[];
  loading: boolean;
  error: boolean;
}

type CachedStats = Omit<GitHubStats, 'loading' | 'error'>;

const USERNAME = 'Airhood';
const CACHE_KEY = `github-stats:${USERNAME}:v2`; // v2 — 언어 계산 방식을 레포 개수 기준으로 되돌리며 캐시 무효화
const CACHE_TTL_MS = 60 * 60 * 1000; // 1시간 — API 요청 한도(비로그인 시간당 60회) 방지

function readCache(): CachedStats | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { savedAt, data } = JSON.parse(raw);
    if (Date.now() - savedAt > CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

function writeCache(data: CachedStats) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // localStorage 사용 불가 시 그냥 무시 (캐시 없이 매번 fetch)
  }
}

export function useGitHubStats(): GitHubStats {
  const cached = readCache();

  const [state, setState] = useState<GitHubStats>({
    publicRepos: cached?.publicRepos ?? 0,
    totalStars: cached?.totalStars ?? 0,
    followers: cached?.followers ?? 0,
    following: cached?.following ?? 0,
    topLanguages: cached?.topLanguages ?? [],
    loading: !cached,
    error: false,
  });

  useEffect(() => {
    if (cached) return; // 캐시가 유효하면 재요청 안 함
    let cancelled = false;

    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&type=owner`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('API error');

        const user = await userRes.json();
        const repos: { stargazers_count: number; language: string | null; fork: boolean }[] =
          await reposRes.json();

        const ownRepos = repos.filter((r) => !r.fork);
        const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);

        // 언어 집계 — 레포 개수 기준
        const langCount: Record<string, number> = {};
        for (const repo of ownRepos) {
          if (repo.language) {
            langCount[repo.language] = (langCount[repo.language] ?? 0) + 1;
          }
        }

        const total = Object.values(langCount).reduce((s, v) => s + v, 0);
        const topLanguages: LanguageStat[] = Object.entries(langCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            count,
            percent: total > 0 ? Math.round((count / total) * 100) : 0,
          }));

        const data: CachedStats = {
          publicRepos: user.public_repos,
          totalStars,
          followers: user.followers,
          following: user.following,
          topLanguages,
        };

        if (!cancelled) {
          writeCache(data);
          setState({ ...data, loading: false, error: false });
        }
      } catch {
        if (!cancelled) {
          setState((prev) => ({ ...prev, loading: false, error: true }));
        }
      }
    }

    fetchStats();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
