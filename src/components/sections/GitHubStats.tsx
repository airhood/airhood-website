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

const DEFAULT_COLOR = '#8b8f99';

// ── 스켈레톤 ──────────────────────────────────────────────────────────────────
const Skeleton: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <div className={`animate-pulse bg-surface-2 rounded-lg ${className}`} style={style} />
);

// ── 통계 카드 ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  loading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, loading }) => (
  <div className="bg-surface border border-line rounded-card p-5 flex flex-col gap-2">
    <div className="text-muted text-lg">{icon}</div>
    {loading ? (
      <>
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-3.5 w-20" />
      </>
    ) : (
      <>
        <span className="font-display text-2xl font-extrabold text-text leading-none">{value}</span>
        <span className="text-xs text-muted font-medium">{label}</span>
      </>
    )}
  </div>
);

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────
const GitHubStats: React.FC = () => {
  const stats = useGitHubStats();

  return (
    <Section id="github" title="GitHub Stats">
      {/* 통계 카드 4개 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<GoRepoForked />} label="Repositories" value={stats.publicRepos} loading={stats.loading} />
        <StatCard icon={<FaStar />}       label="Total Stars"   value={stats.totalStars}  loading={stats.loading} />
        <StatCard icon={<FaUsers />}      label="Followers"     value={stats.followers}   loading={stats.loading} />
        <StatCard icon={<FaCode />}       label="Following"     value={stats.following}   loading={stats.loading} />
      </div>

      {/* 언어 통계 */}
      <div className="bg-surface border border-line rounded-card p-6">
        <h3 className="font-signal text-xs text-muted uppercase tracking-widest mb-6">
          Top Languages
        </h3>

        {stats.loading ? (
          <div className="flex flex-col gap-4">
            {[80, 60, 45, 30, 20].map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-3.5 w-24" />
                <div className="flex-1 h-2 bg-surface-2 rounded-full">
                  <Skeleton className={`h-full rounded-full`} style={{ width: `${w}%` } as React.CSSProperties} />
                </div>
                <Skeleton className="h-3.5 w-8" />
              </div>
            ))}
          </div>
        ) : stats.error ? (
          <p className="text-sm text-muted">
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
                    <span className="text-sm font-medium text-text truncate">
                      {lang.name}
                    </span>
                  </div>

                  <div className="flex-1 h-2 bg-surface-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${lang.percent}%`, backgroundColor: color }}
                    />
                  </div>

                  <span className="font-signal text-xs text-muted w-10 text-right flex-shrink-0">
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
          className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
        >
          <FaGithub size={15} />
          <span>github.com/Airhood</span>
        </a>
      </div>
    </Section>
  );
};

export default GitHubStats;
