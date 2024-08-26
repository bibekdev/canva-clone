import { ColorPicker } from '@/components/editor/color-picker';
import { ToolSidebarClose } from '@/components/editor/tool-sidebar-close';
import { ToolSidebarHeader } from '@/components/editor/tool-sidebar-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ActiveTool, Editor, STROKE_COLOR } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StrokeColorSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokeColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool
}: StrokeColorSidebarProps) => {
  const value = editor?.getActiveStrokeColor() || STROKE_COLOR;

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  return (
    <aside
      className={cn(
        'relative z-[40] flex h-full w-[360px] flex-col border-r bg-card',
        activeTool === 'stroke-color' ? 'visible' : 'hidden'
      )}>
      <ToolSidebarHeader
        title='Stroke color'
        description='Add stroke color to your element'
      />
      <ScrollArea>
        <div className='space-y-6 p-4'>
          <ColorPicker value={value} onChange={onChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
