'use client';

import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

import { useEditor } from '@/hooks';
import { Footer } from './footer';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';
import { Toolbar } from './toobar';

export function Editor() {
  const { init } = useEditor();
  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true
    });
    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!
    });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className='flex h-full flex-col'>
      <Navbar />
      <div className='absolute top-[68px] flex h-[calc(100%-68px)] w-full'>
        <Sidebar />
        <main className='relative flex flex-1 flex-col overflow-auto'>
          <Toolbar />
          <div ref={containerRef} className='h-[calc(100%-124px)] flex-1'>
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
