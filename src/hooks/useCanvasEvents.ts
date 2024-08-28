import { Dispatch, SetStateAction, useEffect } from 'react';
import { fabric } from 'fabric';

type Props = {
  save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: Dispatch<SetStateAction<fabric.Object[]>>;
  clearSelectionCallback?: () => void;
};

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
  save
}: Props) => {
  useEffect(() => {
    if (canvas) {
      canvas.on('object:added', () => save());
      canvas.on('object:removed', () => save());
      canvas.on('object:modified', () => save());
      canvas.on('selection:created', e => {
        setSelectedObjects(e.selected || []);
      });

      canvas.on('selection:updated', e => {
        setSelectedObjects(e.selected || []);
      });

      canvas.on('selection:cleared', () => {
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });
    }

    return () => {
      if (canvas) {
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
      }
    };
  }, [canvas, clearSelectionCallback, save]);
};
