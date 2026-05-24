import React, { ReactNode, useEffect, useRef } from 'react';

interface SvgPreviewProps {
  children: ReactNode;
  onSvgElementChange: (svgElement: SVGSVGElement | null) => void;
}

export function SvgPreview({ children, onSvgElementChange }: SvgPreviewProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const svgElement = wrapperRef.current?.querySelector('svg');
    onSvgElementChange(svgElement ?? null);

    return () => onSvgElementChange(null);
  }, [children, onSvgElementChange]);

  return (
    <section className="flex-1 p-8 flex items-center justify-center bg-gray-200 overflow-auto">
      <div
        className="bg-white shadow-lg border overflow-hidden"
        ref={wrapperRef}
      >
        {children}
      </div>
    </section>
  );
}