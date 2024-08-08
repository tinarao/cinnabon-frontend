import { cn } from '@/lib/utils';
import { Statuses } from '@/types/kanban';

const StatusLabel = ({ status }: { status: Statuses }) => {
  type statuses = Record<Statuses, string>;
  const variants = {
    'not-started': 'orange',
    'in-progress': 'blue',
    completed: 'green',
    scrapped: 'red',
  };

  const title = {
    'not-started': 'Не начаты',
    'in-progress': 'Выполняются',
    completed: 'Выполненные',
    scrapped: 'Заброшенные',
  };

  return (
    <div
      className={cn(
        'col-span-1 flex items-center space-x-2 rounded-md p-2',
        `bg-${variants[status]}-100`
      )}
    >
      <div
        className={cn(
          'size-4 bg-orange-400 rounded-full',
          `bg-${variants[status]}-400`
        )}
      />
      <h3 className="font-medium">{title[status]}</h3>
    </div>
  );
};

export default StatusLabel;
