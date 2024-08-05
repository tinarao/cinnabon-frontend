'use client';

import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const LandingHeader = () => {
  const { user } = useUser();
  // const linkStyles = '[&.active]:text-black';
  const router = useRouter();

  return (
    <header className="border-b py-2">
      <nav className="container ml-auto">
        <Button
          variant="outline"
          onClick={() => {
            if (user) router.push('/dashboard');
            else router.push('/login');
          }}
        >
          <>
            <UserCircle className="size-4 mr-2" /> Приступить к работе
          </>
        </Button>
      </nav>
    </header>
  );
};

export default LandingHeader;
