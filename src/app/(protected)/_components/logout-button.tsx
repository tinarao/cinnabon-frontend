'use client';

import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useUser();

  const logoutHandler = async () => {
    await axios.post(
      'http://localhost:3000/api/auth/logout',
      {},
      { withCredentials: true }
    );

    logout();
    router.replace('/');
  };
  return (
    <Button onClick={logoutHandler} variant="outline">
      Выйти
    </Button>
  );
};

export default LogoutButton;
