'use client';

import Link from 'next/link';
import { Loader, TriangleAlert } from 'lucide-react';

import { useGetProject } from '@/actions/projects/use-get-project';
import { Editor } from '@/components/editor/editor';
import { Button } from '@/components/ui/button';

interface EditorProjectIdPageProps {
  params: {
    projectId: string;
  };
}

const EditorProjectIdPage = ({ params }: EditorProjectIdPageProps) => {
  const { data, isLoading, isError } = useGetProject(params.projectId);

  if (isLoading || !data) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <Loader className='size-6 animate-spin text-muted-foreground' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex h-full flex-col items-center justify-center gap-y-5'>
        <TriangleAlert className='size-6 text-muted-foreground' />
        <p className='text-sm text-muted-foreground'>Failed to fetch project</p>
        <Button asChild variant='secondary'>
          <Link href='/'>Back to Home</Link>
        </Button>
      </div>
    );
  }

  return <Editor initialData={data} />;
};

export default EditorProjectIdPage;
