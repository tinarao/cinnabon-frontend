'use client';

import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { reqUri } from '@/lib/utils';

const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useUser();

  const logoutHandler = async () => {
    const url = reqUri('api/auth/logout');
    await axios.post(url, {}, { withCredentials: true });

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
