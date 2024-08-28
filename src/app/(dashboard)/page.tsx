import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { Banner } from './banner';
import { ProjectsSection } from './projects-section';
import { TemplatesSection } from './template-section';

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className='mx-auto flex max-w-screen-xl flex-col space-y-6 pb-10'>
      <Banner />
      <TemplatesSection />
      <ProjectsSection />
    </div>
  );
}
