import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { motion } from 'motion/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface Props {
  file: string;
}

/** 슬라이드 한 장을 이미지(blob URL)로 미리 그려 둔다 — 넘길 때 다시 렌더링하지 않도록 */
async function renderSlide(pdf: PDFDocumentProxy, n: number, targetWidth: number): Promise<{ url: string; ratio: number } | null> {
  const page = await pdf.getPage(n);
  const base = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: targetWidth / base.width });
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(viewport.width);
  canvas.height = Math.round(viewport.height);
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  await page.render({ canvas, canvasContext: ctx, viewport }).promise;
  const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.92));
  page.cleanup();
  return blob ? { url: URL.createObjectURL(blob), ratio: base.height / base.width } : null;
}

/** PPT에서 만든 PDF를 슬라이드 쇼처럼 한 장씩 넘겨 본다 (버튼, ← →) */
const SlideViewer: React.FC<Props> = ({ file }) => {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [dir, setDir] = useState<1 | -1>(1);
  const [width, setWidth] = useState(900);
  const [ratio, setRatio] = useState(9 / 16); // 높이/너비 — 첫 슬라이드에서 실제 값으로 갱신
  const [cache, setCache] = useState<Record<number, string>>({});
  const boxRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(1);
  const urlsRef = useRef<string[]>([]);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  // 문서를 불러오면 모든 슬라이드를 뒤에서 미리 그려 둔다 (지금 보는 장에 가까운 것부터)
  useEffect(() => {
    if (!pdf || !numPages) return;
    let cancelled = false;
    const targetWidth = Math.min(1800, Math.round((boxRef.current?.clientWidth ?? 900) * Math.min(window.devicePixelRatio || 1, 2)));
    const done = new Set<number>();

    (async () => {
      while (!cancelled && done.size < numPages) {
        const cur = pageRef.current;
        let next = 0;
        let best = Infinity;
        for (let n = 1; n <= numPages; n++) {
          if (done.has(n)) continue;
          const d = n >= cur ? n - cur : (cur - n) * 1.5; // 앞쪽 슬라이드를 약간 우선
          if (d < best) {
            best = d;
            next = n;
          }
        }
        done.add(next);
        try {
          const r = await renderSlide(pdf, next, targetWidth);
          if (cancelled || !r) continue;
          urlsRef.current.push(r.url);
          if (next === 1) setRatio(r.ratio);
          setCache((c) => ({ ...c, [next]: r.url }));
        } catch {
          /* 한 장이 실패해도 나머지는 계속 — 해당 장은 일반 렌더링으로 보여 줌 */
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pdf, numPages]);

  useEffect(
    () => () => {
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      urlsRef.current = [];
    },
    []
  );

  const go = useCallback(
    (d: 1 | -1) => {
      if (!numPages) return;
      setDir(d);
      setPage((p) => Math.min(numPages, Math.max(1, p + d)));
    },
    [numPages]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const arrow =
    'w-10 h-10 rounded-card flex items-center justify-center bg-surface text-text hover:bg-surface-2 transition-colors duration-200 disabled:opacity-30 disabled:pointer-events-none';

  return (
    <div ref={boxRef} className="w-full">
      <Document
        file={file}
        onLoadSuccess={(doc) => {
          setPdf(doc as unknown as PDFDocumentProxy);
          setNumPages(doc.numPages);
        }}
        loading={<p className="text-sm text-muted py-16">불러오는 중...</p>}
        error={<p className="text-sm text-muted py-16">PDF를 불러올 수 없어요.</p>}
      >
        {numPages && (
          <motion.div
            key={page}
            style={{ minHeight: width * ratio }}
            initial={{ opacity: 0, x: dir * 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {cache[page] ? (
              <img src={cache[page]} alt={`슬라이드 ${page}`} draggable={false} className="w-full h-auto block rounded-card" />
            ) : (
              <Page
                pageNumber={page}
                width={width}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                onLoadSuccess={(p) => setRatio(p.originalHeight / p.originalWidth)}
                className="rounded-card overflow-hidden"
              />
            )}
          </motion.div>
        )}
      </Document>

      {numPages && (
        <div className="mt-4 flex items-center justify-between">
          <span className="font-signal text-sm text-muted tabular-nums">
            {page} / {numPages}
          </span>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} disabled={page === 1} aria-label="Previous slide" className={arrow}>
              <HiChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => go(1)} disabled={page === numPages} aria-label="Next slide" className={arrow}>
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideViewer;
