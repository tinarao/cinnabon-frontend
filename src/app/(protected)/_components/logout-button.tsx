'use client';

import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const logoutHandler = async () => {
    const res = await axios.post(
      'http://localhost:3000/api/auth/logout',
      {},
      { withCredentials: true }
    );

    router.refresh();
  };
  return (
    <Button onClick={logoutHandler} variant="outline">
      Выйти
    </Button>
  );
};

export default LogoutButton;
