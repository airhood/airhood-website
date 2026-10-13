import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { FaRegCopy, FaCheck, FaDownload } from 'react-icons/fa';
import { colorToken, C } from '../../lib/vscodeColors.ts';

interface Props {
  name: string;       // 탭에 보이는 파일 이름
  language: string;   // prism 언어 (python 등)
  src: string;        // public 기준 경로
}

interface OutlineItem {
  line: number;
  label: string;
  kind: 'class' | 'def';
  depth: number;
}

/** 클래스와 함수를 찾아 개요 목록으로 만든다 (파이썬 기준) */
function buildOutline(code: string): OutlineItem[] {
  const out: OutlineItem[] = [];
  code.split('\n').forEach((text, i) => {
    const m = /^(\s*)(class|def)\s+(\w+)/.exec(text);
    if (!m) return;
    out.push({ line: i + 1, label: m[3], kind: m[2] as 'class' | 'def', depth: m[1].length > 0 ? 1 : 0 });
  });
  return out;
}

const LINE_H = 22; // px — 줄 높이를 고정해야 개요에서 줄로 정확히 이동할 수 있다

const CodeViewer: React.FC<Props> = ({ name, language, src }) => {
  const [code, setCode] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const paneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((t) => !cancelled && setCode(t))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [src]);

  const outline = useMemo(() => (code ? buildOutline(code) : []), [code]);

  const jumpTo = (line: number) => {
    paneRef.current?.scrollTo({ top: (line - 1) * LINE_H, behavior: 'smooth' });
    setActiveLine(line);
  };

  const copy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const btn =
    'inline-flex items-center gap-2 px-3 h-8 rounded-md text-sm text-muted hover:text-text hover:bg-white/5 transition-colors';

  return (
    <div className="rounded-card overflow-hidden bg-[#101216] mb-16">
      {/* 파일 탭 + 복사/다운로드 */}
      <div className="flex items-center justify-between bg-[#171A1F] px-4 h-11">
        <span className="font-signal text-sm text-text">{name}</span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={copy} disabled={!code} className={btn}>
            {copied ? <FaCheck size={13} /> : <FaRegCopy size={13} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <a href={src} download={name} className={btn}>
            <FaDownload size={13} />
            Download
          </a>
        </div>
      </div>

      {failed && <p className="text-sm text-muted p-6">코드를 불러올 수 없어요.</p>}
      {!failed && !code && <p className="text-sm text-muted p-6">불러오는 중...</p>}

      {code && (
        <div className="flex" style={{ height: 'min(70vh, 720px)' }}>
          {/* 개요: 클래스/함수 목록 — 누르면 해당 줄로 이동 */}
          <aside className="hidden lg:block w-64 shrink-0 overflow-auto bg-[#14171B] py-3">
            {outline.map((item) => (
              <button
                key={item.line}
                type="button"
                onClick={() => jumpTo(item.line)}
                className={`w-full flex items-baseline justify-between gap-3 text-left font-signal text-[13px] py-1 pr-4 hover:bg-white/5 transition-colors ${
                  activeLine === item.line ? 'text-text bg-white/5' : item.kind === 'class' ? 'text-text' : 'text-muted'
                }`}
                style={{ paddingLeft: 16 + item.depth * 14 }}
              >
                <span className="truncate">{item.label}</span>
                <span className="text-xs text-muted/60 tabular-nums">{item.line}</span>
              </button>
            ))}
          </aside>

          {/* 코드 */}
          <div ref={paneRef} className="relative flex-1 min-w-0 overflow-auto">
            <Highlight theme={themes.vsDark} code={code.replace(/\n$/, '')} language={language}>
              {({ tokens, getLineProps }) => (
                <pre className="m-0 py-3 font-signal text-[13px] min-w-max" style={{ background: 'transparent' }}>
                  {tokens.map((line, i) => (
                    <div
                      key={i}
                      {...getLineProps({ line })}
                      className="flex"
                      style={{ height: LINE_H, lineHeight: `${LINE_H}px` }}
                    >
                      <span className="w-14 shrink-0 pr-4 text-right text-muted/50 select-none tabular-nums">{i + 1}</span>
                      <span className="whitespace-pre pr-6" style={{ color: C.text }}>
                        {(() => {
                          const lineText = line.map((t) => t.content).join('');
                          let offset = 0;
                          return line.flatMap((token, k) => {
                            const pieces = colorToken(token, lineText, offset);
                            offset += token.content.length;
                            return pieces.map((p, j) => (
                              <span key={`${k}-${j}`} style={{ color: p.color }}>
                                {p.text}
                              </span>
                            ));
                          });
                        })()}
                      </span>
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeViewer;
