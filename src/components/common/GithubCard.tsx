import React, { useEffect, useState } from 'react';
import { FaGithub, FaStar, FaExternalLinkAlt } from 'react-icons/fa';

interface Props {
  url: string;
  description?: string;
}

interface RepoInfo {
  language: string | null;
  stars: number;
}

/** GitHub 링크가 전부인 프로젝트용 — 저장소 이름, 설명, 언어/별 개수를 보여 주는 카드 */
const GithubCard: React.FC<Props> = ({ url, description }) => {
  const path = url.replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');
  const isRepo = path.split('/').length === 2; // 조직(org) 링크는 저장소 정보가 없다
  const [info, setInfo] = useState<RepoInfo | null>(null);

  useEffect(() => {
    if (!isRepo) return;
    let cancelled = false;
    fetch(`https://api.github.com/repos/${path}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d) setInfo({ language: d.language, stars: d.stargazers_count });
      })
      .catch(() => {}); // 실패하면 언어/별 없이 카드만 보여 준다
    return () => {
      cancelled = true;
    };
  }, [path, isRepo]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start justify-between gap-6 bg-surface hover:bg-surface-2 rounded-card p-6 mb-14 transition-colors"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-3 mb-3">
          <FaGithub size={22} className="text-text flex-shrink-0" />
          <h2 className="font-display text-xl font-extrabold text-text truncate">{path}</h2>
        </div>
        {description && <p className="font-ko text-muted leading-relaxed mb-4">{description}</p>}
        {info && (
          <div className="flex items-center gap-5 text-sm text-muted">
            {info.language && <span>{info.language}</span>}
            <span className="inline-flex items-center gap-1.5">
              <FaStar size={13} /> {info.stars}
            </span>
          </div>
        )}
      </div>
      <FaExternalLinkAlt size={14} className="text-muted mt-1.5 flex-shrink-0" />
    </a>
  );
};

export default GithubCard;
