export default function DashboardPage({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='h-full'>
      <Sidebar />
      <div className='flex h-full flex-col lg:pl-[300px]'>
        <Navbar />
        <main className='bg-card'>{children}</main>
      </div>
    </div>
  );
}
