import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LEProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const LinkElement = ({ href, children, className }: LEProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(className, isActive ? 'active' : undefined)}
    >
      {children}
    </Link>
  );
};

export default LinkElement;
