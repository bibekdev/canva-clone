'use client';

import SmallLogo from '../logos/small';

export function Navbar() {
  return (
    <nav className='flex h-[68px] w-full items-center gap-x-8 border-b bg-card p-4 lg:pl-[34px]'>
      <SmallLogo />
    </nav>
  );
}
