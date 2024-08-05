'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const LandingHeader = () => {
  return (
    <header className="container bg-red-500">
      <nav>
        {/* {session ? (
          <>Logged in!</>
        ) : (
          <Button asChild>
            <Link href="/login">Войти</Link>
          </Button>
        )} */}
      </nav>
    </header>
  );
};

export default LandingHeader;
