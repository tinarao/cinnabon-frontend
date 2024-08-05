'use client';

import Loader from '@/assets/loader.svg';
import Image from 'next/image';

const Loading = ({ width = 96 }: { width?: number }) => {
  return (
    <div className="flex items-center justify-center">
      <Image src={Loader} alt="Загрузка..." width={width} />
    </div>
  );
};

export default Loading;
