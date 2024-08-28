'use client';

import { usePathname } from 'next/navigation';
import { CreditCard, Crown, Home, MessageCircleQuestion } from 'lucide-react';

import { useBilling } from '@/actions/subscriptions/use-billing';
import { useCheckout } from '@/actions/subscriptions/use-checkout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { usePaywall } from '@/hooks';
import { SidebarItem } from './sidebar-item';

export const SidebarRoutes = () => {
  const mutation = useCheckout();
  const billingMutation = useBilling();
  const { shouldBlock, isLoading, triggerPaywall } = usePaywall();
  const pathname = usePathname();

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    billingMutation.mutate();
  };

  return (
    <div className='flex flex-1 flex-col gap-y-4'>
      {shouldBlock && !isLoading && (
        <>
          <div className='px-3'>
            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className='w-full rounded-xl border-none transition hover:bg-white hover:opacity-75'
              variant='outline'
              size='lg'>
              <Crown className='mr-2 size-4 fill-yellow-500 text-yellow-500' />
              Upgrade to Image AI Pro
            </Button>
          </div>
          <div className='px-3'>
            <Separator />
          </div>
        </>
      )}
      <ul className='flex flex-col gap-y-1 px-3'>
        <SidebarItem
          href='/'
          icon={Home}
          label='Home'
          isActive={pathname === '/'}
        />
      </ul>
      <div className='px-3'>
        <Separator />
      </div>
      <ul className='flex flex-col gap-y-1 px-3'>
        <SidebarItem
          href={pathname}
          icon={CreditCard}
          label='Billing'
          onClick={onClick}
        />
        <SidebarItem
          href='mailto:bibek9587@gmail.com'
          icon={MessageCircleQuestion}
          label='Get Help'
        />
      </ul>
    </div>
  );
};
