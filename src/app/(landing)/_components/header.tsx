'use client';

import React from 'react';
import StartButton from './start-button';
import { PenBox } from 'lucide-react';

const LandingHeader = () => {
  return (
    <header className="border-b py-2">
      <nav className="container ml-auto">
        <StartButton>
          <PenBox className="size-4 mr-2" />
          Приступить к работе
        </StartButton>
      </nav>
    </header>
  );
};

export default LandingHeader;
