import Image from 'next/image';
import Link from 'next/link';
import { AlertTriangle, Loader } from 'lucide-react';

import { useGetImages } from '@/actions/images/use-get-images';
import { ToolSidebarClose } from '@/components/editor/tool-sidebar-close';
import { ToolSidebarHeader } from '@/components/editor/tool-sidebar-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ActiveTool, Editor } from '@/lib/types';
import { UploadButton } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';

type Props = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const ImageSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool
}: Props) => {
  const { data, isLoading, isError } = useGetImages();

  const onClose = () => {
    onChangeActiveTool('select');
  };

  return (
    <aside
      className={cn(
        'relative z-[40] flex h-full w-[360px] flex-col border-r bg-card',
        activeTool === 'images' ? 'visible' : 'hidden'
      )}>
      <ToolSidebarHeader
        title='Images'
        description='Add images to your canvas'
      />
      <div className='border-b p-4'>
        <UploadButton
          appearance={{
            button: 'w-full text-sm font-medium bg-primary',
            allowedContent: 'hidden'
          }}
          content={{
            button: 'Upload Image'
          }}
          endpoint='imageUploader'
          onClientUploadComplete={res => {
            editor?.addImage(res[0].url);
          }}
        />
      </div>
      {isLoading && (
        <div className='flex flex-1 items-center justify-center'>
          <Loader className='size-4 animate-spin text-muted-foreground' />
        </div>
      )}
      {isError && (
        <div className='flex flex-1 flex-col items-center justify-center gap-y-4'>
          <AlertTriangle className='size-4 text-muted-foreground' />
          <p className='text-xs text-muted-foreground'>
            Failed to fetch images
          </p>
        </div>
      )}
      <ScrollArea>
        <div className='p-4'>
          <div className='grid grid-cols-2 gap-4'>
            {data &&
              data.map(image => {
                return (
                  <button
                    onClick={() => editor?.addImage(image.urls.regular)}
                    key={image.id}
                    className='group relative h-[100px] w-full overflow-hidden rounded-sm border bg-muted transition hover:opacity-75'>
                    <Image
                      fill
                      src={image.urls.small}
                      alt={image.alt_description || 'Image'}
                      className='object-cover'
                    />
                    <Link
                      target='_blank'
                      href={image.links.html}
                      className='absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100'>
                      {image.user.name}
                    </Link>
                  </button>
                );
              })}
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
