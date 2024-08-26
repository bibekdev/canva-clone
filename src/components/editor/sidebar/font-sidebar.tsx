import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ActiveTool, Editor, fonts } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ToolSidebarClose } from '../tool-sidebar-close';
import { ToolSidebarHeader } from '../tool-sidebar-header';

type Props = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const FontSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool
}: Props) => {
  const value = editor?.getActiveFontFamily();

  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <aside
      className={cn(
        'relative z-[40] flex h-full w-[360px] flex-col border-r bg-card',
        activeTool === 'font' ? 'visible' : 'hidden'
      )}>
      <ToolSidebarHeader title='Font' description='Change the text font' />
      <ScrollArea>
        <div className='space-y-1 border-b p-4'>
          {fonts.map(font => (
            <Button
              key={font}
              variant='secondary'
              size='lg'
              className={cn(
                'h-16 w-full justify-start text-left',
                value === font && 'border-2 border-blue-500'
              )}
              style={{
                fontFamily: font,
                fontSize: '16px',
                padding: '8px 16px'
              }}
              onClick={() => editor?.changeFontFamily(font)}>
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
