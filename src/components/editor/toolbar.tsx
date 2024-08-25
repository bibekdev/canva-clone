import { ActiveTool, Editor } from '@/lib/types';
import { useMemo } from 'react';

type Props = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export function Toolbar({ activeTool, onChangeActiveTool, editor }: Props) {
  const selectedObject = useMemo(
    () => editor?.canvas.getActiveObject(),
    [editor?.canvas]
  );

  const getProperty = (property: string) => {
    if (!selectedObject) return null;

    return selectedObject.set(property);
  };

  return (
    <div className='z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-card p-2'>
      Toolbar
    </div>
  );
}
