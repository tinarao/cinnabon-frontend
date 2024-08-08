'use client';

import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

const StartButton = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={() => {
        if (user) router.push('/dashboard');
        else router.push('/login');
      }}
    >
      {children}
    </Button>
  );
};

export default StartButton;
