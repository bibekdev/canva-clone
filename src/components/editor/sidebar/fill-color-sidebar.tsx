import { useMemo } from 'react';

import { ColorPicker } from '@/components/editor/color-picker';
import { ToolSidebarClose } from '@/components/editor/tool-sidebar-close';
import { ToolSidebarHeader } from '@/components/editor/tool-sidebar-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ActiveTool, Editor, FILL_COLOR } from '@/lib/types';
import { cn } from '@/lib/utils';

type Props = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export default function FillColorSidebar({
  editor,
  activeTool,
  onChangeActiveTool
}: Props) {
  const value = useMemo(
    () => editor?.getActiveFillColor() || FILL_COLOR,
    [editor]
  );

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onChange = (value: string) => {
    editor?.changeFillColor(value);
  };

  return (
    <aside
      className={cn(
        'relative z-[40] flex h-full w-[360px] flex-col border-r bg-card',
        activeTool === 'fill' ? 'visible' : 'hidden'
      )}>
      <ToolSidebarHeader
        title='Fill color'
        description='Add fill color to your element'
      />
      <ScrollArea>
        <div className='space-y-6 p-4'>
          <ColorPicker value={value} onChange={onChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
