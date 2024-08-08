'use client';

import DashbordHeader from './_components/dashboard-header';
import { useQuery } from '@tanstack/react-query';
import { userQueryOptons } from '@/lib/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import Loading from '@/components/Loading';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { login } = useUser();
  const { data, isError, isSuccess, isLoading } = useQuery(userQueryOptons);

  useEffect(() => {
    if (isError) {
      router.replace('/login');
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      login(data);
    }
  }, [isSuccess]);

  return (
    <div className="h-screen flex flex-col">
      <DashbordHeader />
      <main className="py-2 flex-1">
        {isLoading ? (
          <div className="py-48 h-full">
            <Loading />
          </div>
        ) : (
          <>{children}</>
        )}
      </main>
    </div>
  );
};

export default Layout;
