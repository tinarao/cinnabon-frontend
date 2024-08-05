'use client';

import DashbordHeader from './_components/dashboard-header';
import { useQuery } from '@tanstack/react-query';
import { userQueryOptons } from '@/lib/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { Loader2 } from 'lucide-react';
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
    <>
      <DashbordHeader />
      <main className="py-2 bg-secondary">
        {isLoading ? (
          <div className="py-48">
            <Loading />
          </div>
        ) : (
          <>{children}</>
        )}
      </main>
    </>
  );
};

export default Layout;
