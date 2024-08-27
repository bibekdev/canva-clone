'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
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

export const SignUpCard = () => {
  const onProviderSignUp = (provider: 'github' | 'google') => {
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <Card className='size-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Create your new account</CardDescription>
      </CardHeader>

      <CardContent className='space-y-5 px-0 pb-0'>
        <div className='flex flex-col gap-y-2.5'>
          <Button
            onClick={() => onProviderSignUp('google')}
            variant='outline'
            size='lg'
            className='relative w-full'>
            <FcGoogle className='absolute left-2.5 top-2.5 mr-2 size-5' />
            Continue with Google
          </Button>
          <Button
            onClick={() => onProviderSignUp('github')}
            variant='outline'
            size='lg'
            className='relative w-full'>
            <FaGithub className='absolute left-2.5 top-2.5 mr-2 size-5' />
            Continue with Github
          </Button>
        </div>
        <p className='text-xs text-muted-foreground'>
          Already have an account?{' '}
          <Link href='/sign-in'>
            <span className='text-sky-700 hover:underline'>Sign in</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
