import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { SignUpCard } from '@/components/auth/sign-up-card';

const SignUpPage = async () => {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return <SignUpCard />;
};

export default SignUpPage;
