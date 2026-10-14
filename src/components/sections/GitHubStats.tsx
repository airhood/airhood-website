import React from 'react';
import { FaGithub } from 'react-icons/fa';
import Section from '../common/Section.tsx';
import { useGitHubStats, ContributionDay } from '../../hooks/useGitHubStats.ts';

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
  label: string;
  value: number | string;
  loading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, loading }) => (
  <div className="bg-surface rounded-card p-6 flex flex-col gap-2">
    {loading ? (
      <>
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-4 w-32" />
      </>
    ) : (
      <>
        <span className="font-display text-3xl md:text-4xl font-black tracking-tight text-text leading-none">{value}</span>
        <span className="text-base text-muted">{label}</span>
      </>
    )}
  </div>
);

// ── 기여 기록(잔디) ───────────────────────────────────────────────────────────
// 첫 날의 요일만큼 앞을 비워서 열(주) 단위로 맞춘다
const LEVEL_OPACITY = [0, 0.3, 0.5, 0.75, 1];

const Heatmap: React.FC<{ days: ContributionDay[] }> = ({ days }) => {
  const firstDow = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (ContributionDay | null)[] = [...Array(firstDow).fill(null), ...days];
  const weeks = Math.ceil(cells.length / 7);

  return (
    <div
      className="grid grid-flow-col grid-rows-7 gap-1"
      style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
    >
      {cells.map((d, i) =>
        d ? (
          <div
            key={d.date}
            title={`${d.date} · ${d.count}건`}
            className="aspect-square rounded-sm bg-surface-2 relative overflow-hidden"
          >
            {d.level > 0 && (
              <div
                className="absolute inset-0"
                style={{ backgroundColor: 'var(--signal)', opacity: LEVEL_OPACITY[Math.min(d.level, 4)] }}
              />
            )}
          </div>
        ) : (
          <div key={`pad-${i}`} />
        )
      )}
    </div>
  );
};

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────────────
const GitHubStats: React.FC = () => {
  const stats = useGitHubStats();
  const maxPercent = Math.max(1, ...stats.topLanguages.map((l) => l.percent)); // 가장 많은 언어를 막대 100%로

  return (
    <Section id="github" title="GitHub Stats">
      {/* 핵심 수치 — 최근 1년 기여와 활동한 날은 기여 기록을 받아 왔을 때만 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {(stats.loading || stats.contributions) && (
          <>
            <StatCard label="최근 1년 기여" value={stats.contributions?.total ?? 0} loading={stats.loading} />
            <StatCard label="최근 1년 중 활동한 날" value={stats.contributions ? `${stats.contributions.activeDays}일` : 0} loading={stats.loading} />
          </>
        )}
        <StatCard label="공개 저장소" value={stats.publicRepos} loading={stats.loading} />
      </div>

      {/* 기여 기록 */}
      {(stats.loading || stats.contributions) && (
        <div className="bg-surface rounded-card p-6 mb-4">
          <p className="text-base text-muted mb-5">최근 1년 활동</p>
          {stats.loading || !stats.contributions ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <Heatmap days={stats.contributions.days} />
          )}
        </div>
      )}

      {/* 언어 통계 */}
      <div className="bg-surface rounded-card p-6">
        <h3 className="text-base text-muted mb-6">Top Languages</h3>

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
                    <span className="text-base font-medium text-text truncate">
                      {lang.name}
                    </span>
                  </div>

                  <div className="flex-1 h-3 bg-surface-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(lang.percent / maxPercent) * 100}%`, backgroundColor: color }}
                    />
                  </div>

                  <span className="font-signal text-sm text-muted w-12 text-right flex-shrink-0">
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
