'use client';

import { type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '../../ui/button';

type Props = {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
};

export function SidebarItem({ icon: Icon, label, isActive, onClick }: Props) {
  return (
    <Button
      variant='ghost'
      onClick={onClick}
      className={cn(
        'flex aspect-video size-full flex-col rounded-none p-3 py-4 hover:text-primary',
        isActive && 'bg-muted text-primary'
      )}>
      <Icon className='size-5 shrink-0 stroke-2' />
      <span className='mt-2 text-xs'>{label}</span>
    </Button>
  );
}
