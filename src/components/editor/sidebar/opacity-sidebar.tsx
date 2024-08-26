'use client';

import { useEffect, useMemo, useState } from 'react';

import { ToolSidebarClose } from '@/components/editor/tool-sidebar-close';
import { ToolSidebarHeader } from '@/components/editor/tool-sidebar-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { ActiveTool, Editor } from '@/lib/types';
import { cn } from '@/lib/utils';

interface OpacitySidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const OpacitySidebar = ({
  editor,
  activeTool,
  onChangeActiveTool
}: OpacitySidebarProps) => {
  const initialValue = editor?.getActiveOpacity() || 1;
  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects]
  );

  const [opacity, setOpacity] = useState(initialValue);

  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.get('opacity') || 1);
    }
  }, [selectedObject]);

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onChange = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  };

  return (
    <aside
      className={cn(
        'relative z-[40] flex h-full w-[360px] flex-col border-r bg-card',
        activeTool === 'opacity' ? 'visible' : 'hidden'
      )}>
      <ToolSidebarHeader
        title='Opacity'
        description='Change the opacity of the selected object'
      />
      <ScrollArea>
        <div className='space-y-4 border-b p-4'>
          <Slider
            value={[opacity]}
            onValueChange={values => onChange(values[0])}
            max={1}
            min={0}
            step={0.01}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
