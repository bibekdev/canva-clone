'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { fabric } from 'fabric';

import { buildEditor } from '@/lib/editors/build-editor';
import { useAutoResize } from './useAutoResize';
import { useCanvasEvents } from './useCanvasEvents';
import { FILL_COLOR, STROKE_COLOR, STROKE_WIDTH } from '@/lib/types';

export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);

  useAutoResize({ container, canvas });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        setFillColor,
        setStrokeColor,
        setStrokeWidth
      });
    }
    return undefined;
  }, [canvas, fillColor, strokeColor, strokeWidth]);

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    container
  });

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: '#ffffff',
        cornerStyle: 'circle',
        borderColor: '#8b3dff',
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: '#8b3dff'
      });

      const initialWorkspace = new fabric.Rect({
        width: 800,
        height: 1200,
        name: 'clip',
        fill: '#ffffff',
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.8)',
          blur: 5
        })
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    []
  );

  return { init, editor };
};
