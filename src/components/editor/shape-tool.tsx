'use client';

import type { LucideIcon } from 'lucide-react';
import type { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

type Props = {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
};

export const ShapeTool = ({ onClick, icon: Icon, iconClassName }: Props) => {
  return (
    <button onClick={onClick} className='aspect-square rounded-md border p-5'>
      <Icon className={cn('h-full w-full', iconClassName)} />
    </button>
  );
};
