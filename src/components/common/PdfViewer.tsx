import React, { useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface Props {
  file: string;
}

const PdfViewer: React.FC<Props> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? Math.min(window.innerWidth - 48, 900) : 900
  );
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-4 bg-ink border border-line rounded-card py-8 px-4"
    >
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
          if (containerRef.current) {
            setWidth(Math.min(containerRef.current.clientWidth - 32, 900));
          }
        }}
        loading={<p className="text-sm text-muted py-16">불러오는 중...</p>}
        error={<p className="text-sm text-muted py-16">PDF를 불러올 수 없어요.</p>}
        className="flex flex-col items-center gap-4"
      >
        {numPages &&
          Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i}
              pageNumber={i + 1}
              width={width}
              renderTextLayer
              renderAnnotationLayer={false}
              className="[&>canvas]:rounded [&>canvas]:shadow-lg"
            />
          ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
