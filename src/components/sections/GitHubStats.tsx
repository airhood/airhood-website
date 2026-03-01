import React from 'react';
import { FaGithub, FaCode, FaStar, FaUsers } from 'react-icons/fa';
import { GoRepoForked } from 'react-icons/go';
import Section from '../common/Section.tsx';
import { useGitHubStats } from '../../hooks/useGitHubStats.ts';

// GitHub 언어 색상 팔레트
const LANG_COLORS: Record<string, string> = {
  'C#':           '#178600',
  'C++':          '#f34b7d',
  'C':            '#555555',
  'JavaScript':   '#f1e05a',
  'TypeScript':   '#3178c6',
  'Python':       '#3572A5',
  'Java':         '#b07219',
  'Go':           '#00ADD8',
  'Rust':         '#dea584',
  'Dart':         '#00B4AB',
  'Kotlin':       '#A97BFF',
  'Swift':        '#F05138',
  'Shell':        '#89e051',
  'HTML':         '#e34c26',
  'CSS':          '#563d7c',
  'Lua':          '#000080',
  'Ruby':         '#701516',
};

const DEFAULT_COLOR = '#8b5cf6';

// ── 스켈레톤 ──────────────────────────────────────────────────────────────────
const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-lg ${className}`} />
);

// ── 통계 카드 ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  loading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, loading }) => (
  <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 flex flex-col gap-2">
    <div className="text-neutral-400 dark:text-neutral-500 text-lg">{icon}</div>
    {loading ? (
      <>
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-3.5 w-20" />
      </>
    ) : (
      <>
        <span className="text-3xl font-black text-gradient leading-none">{value}</span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{label}</span>
      </>
    )}
  </div>
);

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────
const GitHubStats: React.FC = () => {
  const stats = useGitHubStats();

  return (
    <Section id="github" index="06 —" title="GitHub Stats">
      {/* 통계 카드 4개 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<GoRepoForked />} label="Repositories" value={stats.publicRepos} loading={stats.loading} />
        <StatCard icon={<FaStar />}       label="Total Stars"   value={stats.totalStars}  loading={stats.loading} />
        <StatCard icon={<FaUsers />}      label="Followers"     value={stats.followers}   loading={stats.loading} />
        <StatCard icon={<FaCode />}       label="Following"     value={stats.following}   loading={stats.loading} />
      </div>

      {/* 언어 통계 */}
      <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-6">
          Top Languages
        </h3>

        {stats.loading ? (
          <div className="flex flex-col gap-4">
            {[80, 60, 45, 30, 20].map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-3.5 w-24" />
                <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full">
                  <Skeleton className={`h-full rounded-full`} style={{ width: `${w}%` } as React.CSSProperties} />
                </div>
                <Skeleton className="h-3.5 w-8" />
              </div>
            ))}
          </div>
        ) : stats.error ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            데이터를 불러올 수 없어요. GitHub API 요청 한도를 초과했을 수 있어요.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {stats.topLanguages.map((lang) => {
              const color = LANG_COLORS[lang.name] ?? DEFAULT_COLOR;
              return (
                <div key={lang.name} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 w-32 flex-shrink-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 truncate">
                      {lang.name}
                    </span>
                  </div>

                  <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${lang.percent}%`, backgroundColor: color }}
                    />
                  </div>

                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 w-10 text-right flex-shrink-0">
                    {lang.percent}%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* GitHub 링크 */}
      <div className="mt-4 flex justify-end">
        <a
          href="https://github.com/Airhood"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <FaGithub size={15} />
          <span>github.com/Airhood</span>
        </a>
      </div>
    </Section>
  );
};

export default GitHubStats;
