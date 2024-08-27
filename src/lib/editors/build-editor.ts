import { fabric } from 'fabric';

import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  FONT_SIZE,
  FONT_WEIGHT,
  JSON_KEYS,
  RECTANGLE_OPTIONS,
  TEXT_OPTIONS,
  TRIANGLE_OPTIONS
} from '@/lib/types';
import {
  createFilter,
  downloadFile,
  isTextType,
  transformText
} from '@/lib/utils';

export const buildEditor = ({
  canvas,
  setFillColor,
  fillColor,
  setStrokeColor,
  setStrokeWidth,
  strokeColor,
  strokeWidth,
  selectedObjects,
  strokeDashArray,
  setStrokeDashArray,
  fontFamily,
  setFontFamily,
  copy,
  paste,
  autoZoom,
  save
}: BuildEditorProps): Editor => {
  const generateSaveOptions = () => {
    const { width, height, left, top } = getWorkspace() as fabric.Rect;

    return {
      name: 'Image',
      format: 'png',
      quality: 1,
      width,
      height,
      left,
      top
    };
  };

  const savePng = () => {
    const options = generateSaveOptions();

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const dataUrl = canvas.toDataURL(options);

    downloadFile(dataUrl, 'png');
    autoZoom();
  };

  const saveSvg = () => {
    const options = generateSaveOptions();

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const dataUrl = canvas.toDataURL(options);

    downloadFile(dataUrl, 'svg');
    autoZoom();
  };

  const saveJpg = () => {
    const options = generateSaveOptions();

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const dataUrl = canvas.toDataURL(options);

    downloadFile(dataUrl, 'jpg');
    autoZoom();
  };

  const saveJson = async () => {
    const dataUrl = canvas.toJSON(JSON_KEYS);

    await transformText(dataUrl.objects);
    const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataUrl, null, '\t')
    )}`;
    downloadFile(fileString, 'json');
  };

  const loadJson = (json: string) => {
    const data = JSON.parse(json);

    canvas.loadFromJSON(data, () => {
      autoZoom();
    });
  };

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
    savePng,
    saveJpg,
    saveSvg,
    saveJson,
    loadJson,
    autoZoom,
    getWorkspace,
    onCopy: () => copy(),
    onPaste: () => paste(),

    zoomIn: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio += 0.05;
      const center = canvas.getCenter();
      canvas.zoomToPoint(
        new fabric.Point(center.left, center.top),
        zoomRatio > 1 ? 1 : zoomRatio
      );
    },
    zoomOut: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio -= 0.05;
      const center = canvas.getCenter();
      canvas.zoomToPoint(
        new fabric.Point(center.left, center.top),
        zoomRatio < 0.2 ? 0.2 : zoomRatio
      );
    },

    changeSize: (value: { width: number; height: number }) => {
      const workspace = getWorkspace();

      workspace?.set(value);
      autoZoom();
      save();
    },

    changeBackground: (value: string) => {
      const workspace = getWorkspace();
      workspace?.set({ fill: value });
      canvas.renderAll();
      save();
    },

    enableDrawingMode: () => {
      canvas.discardActiveObject();
      canvas.renderAll();
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.width = strokeWidth;
      canvas.freeDrawingBrush.color = strokeColor;
    },

    disableDrawingMode: () => {
      canvas.isDrawingMode = false;
    },

    bringForward: () => {
      canvas.getActiveObjects().forEach(object => {
        canvas.bringForward(object);
      });
      canvas.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },

    sendBackwards: () => {
      canvas.getActiveObjects().forEach(object => {
        canvas.sendBackwards(object);
      });
      canvas.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },

    changeFontSize: value => {
      canvas.getActiveObjects().forEach(object => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set('fontSize', value);
        }
      });
      canvas.renderAll();
    },

    changeOpacity: value => {
      canvas.getActiveObjects().forEach(object => {
        object.set('opacity', value);
      });
      canvas.renderAll();
    },

    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach(object => {
        object.set('fill', value);
      });
      canvas.renderAll();
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
      canvas.freeDrawingBrush.color = value;
      canvas.renderAll();
    },

    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach(object => {
        object.set('strokeWidth', value);
      });
      canvas.freeDrawingBrush.width = value;
      canvas.renderAll();
    },

    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach(object => {
        object.set('strokeDashArray', value);
      });
      canvas.renderAll();
    },

    changeTextAlign: (value: string) => {
      canvas.getActiveObjects().forEach(object => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set('textAlign', value);
        }
      });
      canvas.renderAll();
    },

    changeFontFamily: (value: string) => {
      setFontFamily(value);
      canvas.getActiveObjects().forEach(object => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set('fontFamily', value);
        }
      });
      canvas.renderAll();
    },

    changeFontLinethrough: value => {
      canvas.getActiveObjects().forEach(object => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set('linethrough', value);
        }
      });
      canvas.renderAll();
    },

    changeFontStyle: value => {
      canvas.getActiveObjects().forEach(object => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set('fontStyle', value);
        }
      });
      canvas.renderAll();
    },

    changeFontUnderline: value => {
      canvas.getActiveObjects().forEach(object => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set('underline', value);
        }
      });
      canvas.renderAll();
    },

    changeFontWeight: value => {
      canvas.getActiveObjects().forEach(object => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set('fontWeight', value);
        }
      });
      canvas.renderAll();
    },

    changeImageFilter: value => {
      const objects = canvas.getActiveObjects();
      objects.forEach(object => {
        if (object.type === 'image') {
          const imageObject = object as fabric.Image;

          const effect = createFilter(value);

          imageObject.filters = effect ? [effect] : [];
          imageObject.applyFilters();
          canvas.renderAll();
        }
      });
    },

    delete: () => {
      canvas.getActiveObjects().forEach(object => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },

    addImage: value => {
      fabric.Image.fromURL(
        value,
        image => {
          const workspace = getWorkspace();

          image.scaleToWidth(workspace?.width || 0);
          image.scaleToHeight(workspace?.height || 0);

          addToCanvas(image);
        },
        { crossOrigin: 'anonymous' }
      );
    },

    addText: (value, options) => {
      const object = new fabric.Textbox(value, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options
      });
      addToCanvas(object);
    },

    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth
      });
      addToCanvas(object);
    },

    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 10,
        ry: 10,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth
      });
      addToCanvas(object);
    },

    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth
      });
      addToCanvas(object);
    },

    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth
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
        {
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth
        }
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
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth
        }
      );

      addToCanvas(object);
    },

    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return fillColor;

      return selectedObject.get('fill') as string;
    },

    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return strokeColor;

      return selectedObject.get('stroke') as string;
    },

    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return strokeWidth;

      return selectedObject.get('strokeWidth') as number;
    },

    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return strokeDashArray;

      return selectedObject.get('strokeDashArray') as number[];
    },

    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return 1;

      return selectedObject.get('opacity') as number;
    },

    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return fontFamily;

      // @ts-ignore
      return selectedObject.get('fontFamily') as string;
    },

    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return FONT_WEIGHT;

      // @ts-ignore
      return selectedObject.get('fontWeight') as number;
    },

    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return FONT_SIZE;

      // @ts-ignore
      return selectedObject.get('fontSize') as number;
    },

    getActiveTextAlign: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return 'left';

      // @ts-ignore
      return selectedObject.get('textAlign') as string;
    },

    getActiveFontUnderline: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return false;

      // @ts-ignore
      return selectedObject.get('underline') as boolean;
    },

    getActiveFontLinethrough: () => {
      const selectedObject = selectedObjects[0];
      if (!selectedObject) return false;

      // @ts-ignore
      return selectedObject.get('linethrough') as boolean;
    },

    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return 'normal';
      }

      // @ts-ignore
      return selectedObject.get('fontStyle');
    },

    canvas,
    selectedObjects
  };
};
