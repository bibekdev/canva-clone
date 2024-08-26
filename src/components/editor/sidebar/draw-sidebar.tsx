import { ColorPicker } from '@/components/editor/color-picker';
import { ToolSidebarClose } from '@/components/editor/tool-sidebar-close';
import { ToolSidebarHeader } from '@/components/editor/tool-sidebar-header';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { ActiveTool, Editor, STROKE_COLOR, STROKE_WIDTH } from '@/lib/types';
import { cn } from '@/lib/utils';

type Props = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const DrawSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool
}: Props) => {
  const colorValue = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onClose = () => {
    editor?.disableDrawingMode();
    onChangeActiveTool('select');
  };

  const onColorChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  const onWidthChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  return (
    <aside
      className={cn(
        'relative z-[40] flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'draw' ? 'visible' : 'hidden'
      )}>
      <ToolSidebarHeader
        title='Drawing mode'
        description='Modify brush settings'
      />
      <ScrollArea>
        <div className='space-y-6 border-b p-4'>
          <Label className='text-sm'>Brush width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={values => onWidthChange(values[0])}
          />
        </div>
        <div className='space-y-6 p-4'>
          <ColorPicker value={colorValue} onChange={onColorChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
