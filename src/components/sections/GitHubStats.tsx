import React from 'react';
import { FaGithub } from 'react-icons/fa';
import Section from '../common/Section.tsx';
import { useGitHubStats, ContributionDay } from '../../hooks/useGitHubStats.ts';

// 순위(0=가장 많음)별 파스텔 색 — 첫 색은 사이트 포인트(주황) 계열
const LANG_PALETTE = ['#FFAF78', '#95E1C9', '#8FC3FF', '#C3A9F9', '#FFE57F', '#FD9EBC'];
const langColor = (i: number) => LANG_PALETTE[i % LANG_PALETTE.length];

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
            title={`${d.date} · ${d.count} contributions`}
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

  return (
    <Section id="github" title="GitHub Stats">
      {/* 핵심 수치 — 최근 1년 기여와 활동한 날은 기여 기록을 받아 왔을 때만 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {(stats.loading || stats.contributions) && (
          <>
            <StatCard label="Contributions in the last year" value={stats.contributions?.total ?? 0} loading={stats.loading} />
            <StatCard label="Active days in the last year" value={stats.contributions ? stats.contributions.activeDays : 0} loading={stats.loading} />
          </>
        )}
        <StatCard label="Public repositories" value={stats.publicRepos} loading={stats.loading} />
      </div>

      {/* 기여 기록 */}
      {(stats.loading || stats.contributions) && (
        <div className="bg-surface rounded-card p-6 mb-4">
          <p className="text-base text-muted mb-5">Activity in the last year</p>
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
          <div>
            <Skeleton className="h-3 w-full rounded-full mb-6" />
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-5 w-24" />
              ))}
            </div>
          </div>
        ) : stats.error ? (
          <p className="text-sm text-muted">
            Could not load GitHub data. The API rate limit may have been exceeded.
          </p>
        ) : (
          <div>
            {/* 비율대로 이어 붙인 한 줄 막대 */}
            <div className="flex gap-0.5 h-4 mb-6">
              {stats.topLanguages.map((lang, i) => (
                <div
                  key={lang.name}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  style={{ flexGrow: lang.percent, flexBasis: 0, backgroundColor: langColor(i) }}
                />
              ))}
            </div>

            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {stats.topLanguages.map((lang, i) => (
                <li key={lang.name} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: langColor(i) }}
                  />
                  <span className="text-base font-medium text-text">{lang.name}</span>
                  <span className="font-signal text-sm text-muted">{lang.percent}%</span>
                </li>
              ))}
            </ul>
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
