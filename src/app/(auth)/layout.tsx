'use client';

import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid grid-cols-8 h-screen">
      <div className="flex items-center justify-center col-span-3 bg-secondary">
        {children}
      </div>
      <div className="col-span-5 border-l auth__img"></div>
    </main>
  );
};

export default Layout;
