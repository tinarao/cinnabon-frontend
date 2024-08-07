import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

interface LEProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const LinkElement = ({ href, children, className }: LEProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (!href) {
    return (
      <Button variant="ghost">
        <span
          className={cn(
            'cursor-pointer',
            className,
            isActive ? 'active' : undefined
          )}
        >
          {children}
        </span>
      </Button>
    );
  }

  return (
    <Button variant="ghost">
      <Link
        href={href}
        className={cn(className, isActive ? 'active' : undefined)}
      >
        {children}
      </Link>
    </Button>
  );
};

export default LinkElement;
