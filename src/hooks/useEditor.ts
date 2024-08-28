'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { fabric } from 'fabric';

import { buildEditor } from '@/lib/editors/build-editor';
import {
  EditorHookProps,
  FILL_COLOR,
  FONT_FAMILY,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH
} from '@/lib/types';
import { useClipboard } from './use-clipboard';
import { useLoadState } from './use-load-state';
import { useAutoResize } from './useAutoResize';
import { useCanvasEvents } from './useCanvasEvents';
import { useHistory } from './useHistory';
import { useHotkeys } from './useHotkeys';
import { useWindowEvents } from './useWindowEvents';

export const useEditor = ({
  clearSelectionCallback,
  saveCallback,
  defaultHeight,
  defaultState,
  defaultWidth
}: EditorHookProps) => {
  const initialState = useRef(defaultState);
  const initialWidth = useRef(defaultWidth);
  const initialHeight = useRef(defaultHeight);

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fillColor, setFillColor] = useState<string>(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState<string>(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);
  const [fontFamily, setFontFamily] = useState<string>(FONT_FAMILY);

  useWindowEvents();

  const { autoZoom } = useAutoResize({ container, canvas });

  const { save, canRedo, canUndo, undo, redo, canvasHistory, setHistoryIndex } =
    useHistory({
      canvas,
      saveCallback
    });

  const { copy, paste } = useClipboard({ canvas });

  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback,
    save
  });

  useHotkeys({
    undo,
    redo,
    copy,
    paste,
    save,
    canvas
  });

  useLoadState({
    canvas,
    autoZoom,
    initialState,
    canvasHistory,
    setHistoryIndex
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        autoZoom,
        copy,
        paste,
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        strokeDashArray,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        selectedObjects,
        setStrokeDashArray,
        fontFamily,
        setFontFamily,
        canRedo,
        canUndo,
        redo,
        undo,
        save
      });
    }
    return undefined;
  }, [
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
    strokeDashArray,
    copy,
    paste,
    fontFamily,
    autoZoom,
    canRedo,
    canUndo,
    redo,
    undo,
    save
  ]);

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
        width: initialWidth.current,
        height: initialHeight.current,
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
