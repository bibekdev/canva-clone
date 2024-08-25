import { fabric } from 'fabric';

import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS
} from '@/lib/types';
import { isTextType } from '@/lib/utils';

export const buildEditor = ({
  canvas,
  setFillColor,
  fillColor,
  setStrokeColor,
  setStrokeWidth,
  strokeColor,
  strokeWidth
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find(object => object.name === 'clip');
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    if (!center) return;

    // @ts-ignore
    canvas._centerObject(object, center);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach(object => {
        object.set('fill', value);
      });
    },

    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach(object => {
        if (isTextType(object.type)) {
          object.set('fill', value);
          return;
        }
        object.set('stroke', value);
      });
    },

    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach(object => {
        object.set('strokeWidth', value);
      });
    },

    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS
      });
      addToCanvas(object);
    },

    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 10,
        ry: 10
      });
      addToCanvas(object);
    },

    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS
      });
      addToCanvas(object);
    },

    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS
      });
      addToCanvas(object);
    },

    addInverseTriangle: () => {
      const WIDTH = TRIANGLE_OPTIONS.width;
      const HEIGHT = TRIANGLE_OPTIONS.height;

      const object = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT }
        ],
        { ...TRIANGLE_OPTIONS }
      );

      addToCanvas(object);
    },

    addDiamond: () => {
      const WIDTH = DIAMOND_OPTIONS.width;
      const HEIGHT = DIAMOND_OPTIONS.height;

      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 }
        ],
        { ...DIAMOND_OPTIONS }
      );

      addToCanvas(object);
    },
    getActiveFillColor: () => fillColor,
    getActiveStrokeColor: () => strokeColor,
    getActiveStrokeWidth: () => strokeWidth,
    canvas
    // getActiveStrokeDashArray: () => STROKE_DASH_ARRAY,
    // selectedObjects
  };
};
