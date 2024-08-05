'use client';

import DashbordHeader from './_components/dashboard-header';
import { useQuery } from '@tanstack/react-query';
import { userQueryOptons } from '@/lib/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { Loader2 } from 'lucide-react';

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
    <>
      <DashbordHeader />
      <main>
        {isLoading ? (
          <div className="py-48">
            <Loader2 size={32} className="w-fit mx-auto animate-spin" />
          </div>
        ) : (
          <>{children}</>
        )}
      </main>
    </>
  );
};

export default Layout;
