'use client';

import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2
} from 'lucide-react';
import { BsCloudCheck } from 'react-icons/bs';
import { CiFileOn } from 'react-icons/ci';

import { Hint } from '@/components/common/hint';
import SmallLogo from '@/components/logos/small';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ActiveTool } from '@/lib/types';
import { cn } from '@/lib/utils';

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export function Navbar({ activeTool, onChangeActiveTool }: Props) {
  return (
    <nav className='flex h-[68px] w-full items-center gap-x-8 border-b bg-card p-4 lg:pl-[34px]'>
      <SmallLogo />
      <div className='flex size-full items-center gap-x-1'>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size='sm' variant='ghost'>
              File <ChevronDown className='ml-2 size-4' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='start' className='min-w-60'>
            <DropdownMenuItem
              onClick={() => {}}
              className='flex items-center gap-x-2'>
              <CiFileOn className='size-8' />
              <div>
                <p>Open</p>
                <p className='text-xs text-muted-foreground'>
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator className='mx-2' orientation='vertical' />

        <Hint label='Select' side='bottom' sideOffset={10}>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => onChangeActiveTool('select')}
            className={cn(activeTool === 'select' && 'bg-background')}>
            <MousePointerClick className='size-4' />
          </Button>
        </Hint>

        <Hint label='Undo' side='bottom' sideOffset={10}>
          <Button
            // disabled={!editor?.canUndo()}
            variant='ghost'
            size='icon'
            // onClick={() => editor?.onUndo()}
          >
            <Undo2 className='size-4' />
          </Button>
        </Hint>

        <Hint label='Redo' side='bottom' sideOffset={10}>
          <Button
            // disabled={!editor?.canRedo()}
            variant='ghost'
            size='icon'
            // onClick={() => editor?.onRedo()}
          >
            <Redo2 className='size-4' />
          </Button>
        </Hint>

        <Separator orientation='vertical' className='mx-2' />

        <div className='flex items-center gap-x-2'>
          <BsCloudCheck className='size-[20px] text-muted-foreground' />
          <div className='text-xs text-muted-foreground'>Saved</div>
        </div>

        <div className='ml-auto flex items-center gap-x-4'>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size='sm' variant='ghost'>
                Export
                <Download className='ml-4 size-4' />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' className='min-w-60'>
              <DropdownMenuItem className='flex items-center gap-x-2'>
                <CiFileOn className='size-8' />
                <div>
                  <p>JSON</p>
                  <p className='text-xs text-muted-foreground'>
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className='flex items-center gap-x-2'>
                <CiFileOn className='size-8' />
                <div>
                  <p>PNG</p>
                  <p className='text-xs text-muted-foreground'>
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className='flex items-center gap-x-2'>
                <CiFileOn className='size-8' />
                <div>
                  <p>JPG</p>
                  <p className='text-xs text-muted-foreground'>
                    Best for printing
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className='flex items-center gap-x-2'>
                <CiFileOn className='size-8' />
                <div>
                  <p>SVG</p>
                  <p className='text-xs text-muted-foreground'>
                    Best for editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
