'use client';

import {
  ImageIcon,
  LayoutTemplate,
  Pencil,
  Settings,
  Shapes,
  Sparkles,
  Type
} from 'lucide-react';

import { ActiveTool } from '@/lib/types';
import { SidebarItem } from './sidebar-item';

type Props = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export function Sidebar({ activeTool, onChangeActiveTool }: Props) {
  return (
    <div className='flex h-full w-[100px] flex-col overflow-y-auto border-r bg-card'>
      <ul className='flex flex-col'>
        <SidebarItem
          icon={LayoutTemplate}
          label='Design'
          isActive={activeTool === 'templates'}
          onClick={() => onChangeActiveTool('templates')}
        />
        <SidebarItem
          icon={ImageIcon}
          label='Image'
          isActive={activeTool === 'images'}
          onClick={() => onChangeActiveTool('images')}
        />
        <SidebarItem
          icon={Type}
          label='Text'
          isActive={activeTool === 'text'}
          onClick={() => onChangeActiveTool('text')}
        />
        <SidebarItem
          icon={Shapes}
          label='Shapes'
          isActive={activeTool === 'shapes'}
          onClick={() => onChangeActiveTool('shapes')}
        />
        <SidebarItem
          icon={Pencil}
          label='Draw'
          isActive={activeTool === 'draw'}
          onClick={() => onChangeActiveTool('draw')}
        />
        <SidebarItem
          icon={Sparkles}
          label='AI'
          isActive={activeTool === 'ai'}
          onClick={() => onChangeActiveTool('ai')}
        />
        <SidebarItem
          icon={Settings}
          label='Settings'
          isActive={activeTool === 'settings'}
          onClick={() => onChangeActiveTool('settings')}
        />
      </ul>
    </div>
  );
}
