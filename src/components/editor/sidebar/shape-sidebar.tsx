'use client';

import { FaCircle, FaSquare, FaSquareFull } from 'react-icons/fa';
import { FaDiamond } from 'react-icons/fa6';
import { IoTriangle } from 'react-icons/io5';

import { ActiveTool, Editor } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ShapeTool } from '../shape-tool';
import { ToolSidebarClose } from '../tool-sidebar-close';
import { ToolSidebarHeader } from '../tool-sidebar-header';
import { ScrollArea } from '../../ui/scroll-area';

type Props = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export function ShapeSidebar({
  activeTool,
  onChangeActiveTool,
  editor
}: Props) {
  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <aside
      className={cn(
        'relative z-[40] flex h-full w-[360px] flex-col border-r bg-card transition-all',
        activeTool === 'shapes' ? 'visible' : 'hidden'
      )}>
      <ToolSidebarHeader
        title='Shapes'
        description='Add shapes to your canvas'
      />

      <ScrollArea>
        <div className='grid grid-cols-3 gap-4 p-4'>
          <ShapeTool onClick={() => editor?.addCircle()} icon={FaCircle} />
          <ShapeTool
            onClick={() => editor?.addSoftRectangle()}
            icon={FaSquare}
          />
          <ShapeTool
            onClick={() => editor?.addRectangle()}
            icon={FaSquareFull}
          />
          <ShapeTool onClick={() => editor?.addTriangle()} icon={IoTriangle} />
          <ShapeTool
            onClick={() => editor?.addInverseTriangle()}
            icon={IoTriangle}
            iconClassName='rotate-180'
          />
          <ShapeTool onClick={() => editor?.addDiamond()} icon={FaDiamond} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
}
