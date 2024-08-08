import Image from 'next/image';
import LandingHeader from './_components/header';
import Illustration from '@/assets/landing-illustration.png';
import { UserPen } from 'lucide-react';
import StartButton from './_components/start-button';

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main className="flex flex-col items-center justify-center h-full gap-y-2 py-20">
        <Image src={Illustration} width={1200} alt="Tracker" />
        <h1 className="text-2xl font-medium">
          Максимальная продуктивность. Минимальное разнообразие.
        </h1>
        <StartButton>
          <UserPen className="size-4 mr-2" />
          Распланировать свою жизнь
        </StartButton>
      </main>
    </>
  );
}
