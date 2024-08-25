'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

import { useEditor } from '@/hooks';
import { ActiveTool } from '@/lib/types';
import { Footer } from './footer';
import { Navbar } from './navbar';
import { ShapeSidebar } from './sidebar/shape-sidebar';
import { Sidebar } from './sidebar/sidebar';
import { Toolbar } from './toolbar';

export function Editor() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('select');
  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { init, editor } = useEditor();

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) return setActiveTool('select');

      setActiveTool(tool);
    },

    [activeTool]
  );

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
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className='absolute top-[68px] flex h-[calc(100%-68px)] w-full'>
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className='relative flex flex-1 flex-col overflow-auto'>
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            key={JSON.stringify(editor?.canvas.getActiveObject())}
          />
          <div ref={containerRef} className='h-[calc(100%-124px)] flex-1'>
            <canvas ref={canvasRef} />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
