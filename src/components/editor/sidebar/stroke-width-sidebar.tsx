import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import {
  ActiveTool,
  Editor,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH
} from '@/lib/types';
import { cn } from '@/lib/utils';
import { ToolSidebarHeader } from '../tool-sidebar-header';

type Props = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export function StrokeWidthSidebar({
  editor,
  activeTool,
  onChangeActiveTool
}: Props) {
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

  const onClose = () => {
    onChangeActiveTool('select');
  };

  const onChangeStrokeWidth = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <aside
      className={cn(
        'relative z-[40] flex h-full w-[360px] flex-col border-r bg-card',
        activeTool === 'stroke-width' ? 'visible' : 'hidden'
      )}>
      <ToolSidebarHeader
        title='Stroke options'
        description='Modify the stroke of your element'
      />

      <ScrollArea>
        <div className='space-y-4 border-b p-4'>
          <Label className='text-sm'>Stroke width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={values => onChangeStrokeWidth(values[0])}
          />
        </div>

        <div className='space-y-4 border-b p-4'>
          <Label className='text-sm'>Stroke type</Label>
          <Button
            onClick={() => onChangeStrokeType([])}
            variant='secondary'
            size='lg'
            className={cn(
              'h-16 w-full justify-start text-left',
              JSON.stringify(typeValue) === `[]` && 'border-2 border-primary'
            )}
            style={{
              padding: '8px 16px'
            }}>
            <div className='w-full rounded-full border-4 border-black' />
          </Button>

          <Button
            onClick={() => onChangeStrokeType([5, 5])}
            variant='secondary'
            size='lg'
            className={cn(
              'h-16 w-full justify-start text-left',
              JSON.stringify(typeValue) === `[5,5]` && 'border-2 border-primary'
            )}
            style={{
              padding: '8px 16px'
            }}>
            <div className='w-full rounded-full border-4 border-dashed border-black' />
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
}
