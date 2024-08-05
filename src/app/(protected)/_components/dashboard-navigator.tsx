'use client';

import LinkElement from '@/components/NavLink';

const DashboardNavigator = () => {
  const linkStyles = '[&.active]:text-black';
  return (
    <nav>
      <ul className="font-medium text-sm flex gap-x-6 text-muted-foreground">
        <li>
          <LinkElement className={linkStyles} href="/dashboard">
            Синнабоны
          </LinkElement>
        </li>
        <li>
          <LinkElement className={linkStyles} href="/">
            Пользователи
          </LinkElement>
        </li>
        <li>
          <LinkElement className={linkStyles} href="/">
            Тарифы
          </LinkElement>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardNavigator;
