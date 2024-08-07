'use client';

import LinkElement from '@/components/NavLink';
import ProjectsPopover from './projects-popover';

const DashboardNavigator = () => {
  const linkStyles = `
    px-4 py-2 
    rounded-md

    [&.active]:text-primary 
    [&.active]:bg-neutral-200
    [&.active]:hover:bg-neutral-400
    [&.active]:hover:text-white 

    hover:text-black
    transition
  `;
  return (
    <nav>
      <ul className="font-medium text-sm flex gap-x-6 text-muted-foreground">
        <li>
          <LinkElement className={linkStyles} href="/dashboard/graph">
            Graph
          </LinkElement>
        </li>
        <li>
          {/* <LinkElement className={linkStyles}>Проекты</LinkElement> */}
          <ProjectsPopover className={linkStyles}>Проекты</ProjectsPopover>
        </li>
        <li>
          <LinkElement className={linkStyles} href="/">
            Записки
          </LinkElement>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardNavigator;
