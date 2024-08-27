'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

import { useEditor } from '@/hooks';
import { ActiveTool, selectionDependentTools } from '@/lib/types';
import { DrawSidebar } from './sidebar/draw-sidebar';
import FillColorSidebar from './sidebar/fill-color-sidebar';
import { FilterSidebar } from './sidebar/filter-sidebar';
import { FontSidebar } from './sidebar/font-sidebar';
import { ImageSidebar } from './sidebar/image-sidebar';
import { OpacitySidebar } from './sidebar/opacity-sidebar';
import { SettingsSidebar } from './sidebar/settings-sidebar';
import { ShapeSidebar } from './sidebar/shape-sidebar';
import { Sidebar } from './sidebar/sidebar';
import { StrokeColorSidebar } from './sidebar/stroke-color-sidebar';
import { StrokeWidthSidebar } from './sidebar/stroke-width-sidebar';
import { TextSidebar } from './sidebar/text-sidebar';
import { Footer } from './footer';
import { Navbar } from './navbar';
import { Toolbar } from './toolbar';

export function Editor() {
  const [activeTool, setActiveTool] = useState<ActiveTool>('select');
  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool('select');
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection
  });

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === 'draw') {
        editor?.enableDrawingMode();
      }

      if (activeTool === 'draw') {
        editor?.disableDrawingMode();
      }

      if (tool === activeTool) return setActiveTool('select');

      setActiveTool(tool);
    },

    [activeTool, editor]
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
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <TextSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FontSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ImageSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FilterSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <DrawSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <SettingsSidebar
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

          <Footer editor={editor} />
        </main>
      </div>
    </div>
  );
}
