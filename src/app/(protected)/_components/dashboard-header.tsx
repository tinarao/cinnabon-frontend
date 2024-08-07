import LogoutButton from './logout-button';
import DashboardNavigator from './dashboard-navigator';
import Logo from '@/components/Logo';
import { ThemeToggle } from '@/components/theming/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Cog } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const DashbordHeader = () => {
  return (
    <header className="border-b-2 py-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Logo />
          <DashboardNavigator />
        </div>
        <div className="space-x-2 flex items-center">
          {/* <ThemeToggle /> */}
          <Button size="icon" variant="outline">
            <Cog className="size-5" />
          </Button>
          <Separator orientation="vertical" className="py-4 h-full" />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default DashbordHeader;
