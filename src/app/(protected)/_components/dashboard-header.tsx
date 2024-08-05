import LogoutButton from './logout-button';
import DashboardNavigator from './dashboard-navigator';
import Logo from '@/components/Logo';
import { ThemeToggle } from '@/components/theming/ThemeToggle';

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
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default DashbordHeader;
