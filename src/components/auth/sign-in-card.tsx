'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { TriangleAlert } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export const SignInCard = () => {
  const params = useSearchParams();
  const error = params.get('error');

  const onProviderSignIn = (provider: 'github' | 'google') => {
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <Card className='size-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className='mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
          <TriangleAlert className='size-4' />
          <p>Invalid email or password</p>
        </div>
      )}
      <CardContent className='space-y-5 px-0 pb-0'>
        <div className='flex flex-col gap-y-2.5'>
          <Button
            onClick={() => onProviderSignIn('google')}
            variant='outline'
            size='lg'
            className='relative w-full'>
            <FcGoogle className='absolute left-2.5 top-2.5 mr-2 size-5' />
            Continue with Google
          </Button>
          <Button
            onClick={() => onProviderSignIn('github')}
            variant='outline'
            size='lg'
            className='relative w-full'>
            <FaGithub className='absolute left-2.5 top-2.5 mr-2 size-5' />
            Continue with Github
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <Link href='/sign-up'>
            <span className='text-sky-700 hover:underline'>Sign up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
