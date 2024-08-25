import { fabric } from 'fabric';
import { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
  setSelectedObjects: Dispatch<SetStateAction<fabric.Object[]>>;
};

export const useCanvasEvents = ({
  canvas,
  container,
  setSelectedObjects
}: Props) => {
  useEffect(() => {
    if (canvas) {
      canvas.on('selection:created', e => {
        setSelectedObjects(e.selected || []);
      });

      canvas.on('selection:updated', e => {
        setSelectedObjects(e.selected || []);
      });

      canvas.on('selection:cleared', () => {
        setSelectedObjects([]);
      });
    }

    return () => {
      if (canvas) {
        canvas.off('selection:created');
        canvas.off('selection:updated');
        canvas.off('selection:cleared');
      }
    };
  }, [canvas]);
};
