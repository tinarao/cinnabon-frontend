import LogoutButton from './logout-button';
import DashboardNavigator from './dashboard-navigator';

const DashbordHeader = () => {
  return (
    <header className="border-b-2 py-2">
      <div className="container flex justify-between">
        <DashboardNavigator />
        <LogoutButton />
      </div>
    </header>
  );
};

export default DashbordHeader;
