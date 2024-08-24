'use client';

import { useEffect } from 'react';

// Hooks that executes the argument function everytime
// the user loses focus on page (switching tabs, etc.)
export const useBlur = (fn: () => void) => {
  useEffect(() => {
    window.addEventListener('blur', fn);

    return () => {
      window.removeEventListener('blur', fn);
    };
  }, []);
};
