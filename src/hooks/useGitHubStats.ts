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

const USERNAME = 'Airhood';

export function useGitHubStats(): GitHubStats {
  const [state, setState] = useState<GitHubStats>({
    publicRepos: 0,
    totalStars: 0,
    followers: 0,
    following: 0,
    topLanguages: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
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

        // 언어 집계
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

        if (!cancelled) {
          setState({
            publicRepos: user.public_repos,
            totalStars,
            followers: user.followers,
            following: user.following,
            topLanguages,
            loading: false,
            error: false,
          });
        }
      } catch {
        if (!cancelled) {
          setState((prev) => ({ ...prev, loading: false, error: true }));
        }
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  return state;
}
