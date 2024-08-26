import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ActiveTool, Editor, filters } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ToolSidebarClose } from '../tool-sidebar-close';
import { ToolSidebarHeader } from '../tool-sidebar-header';

type Props = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool
}: Props) => {
  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <aside
      className={cn(
        'relative z-[40] flex h-full w-[360px] flex-col border-r bg-white',
        activeTool === 'filter' ? 'visible' : 'hidden'
      )}>
      <ToolSidebarHeader
        title='Filters'
        description='Apply a filter to selected image'
      />
      <ScrollArea>
        <div className='space-y-1 border-b p-4'>
          {filters.map(filter => (
            <Button
              key={filter}
              variant='secondary'
              size='lg'
              className='h-16 w-full justify-start text-left'
              onClick={() => editor?.changeImageFilter(filter)}>
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
