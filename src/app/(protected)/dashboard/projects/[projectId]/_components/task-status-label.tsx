import { Statuses, StatusesType } from '@/types/kanban';

const StatusLabel = ({ status }: { status: StatusesType }) => {
  const labels: Record<StatusesType, string> = {
    completed: 'Выполненные',
    'in-progress': 'Выполняются',
    'not-started': 'Не начаты',
    scrapped: 'Заброшенные',
  };

  switch (status) {
    case 'completed':
      return (
        <div className="flex items-center space-x-2 p-2 dark:bg-background dark:border light:bg-green-100 rounded-md">
          <div className="size-4 bg-green-500 rounded-full" />
          <h6 className="font-medium">{labels[status]}</h6>
        </div>
      );
    case 'in-progress':
      return (
        <div className="flex items-center space-x-2 p-2 dark:border light:bg-blue-100 rounded-md">
          <div className="size-4 bg-blue-500 rounded-full" />
          <h6 className="font-medium">{labels[status]}</h6>
        </div>
      );
    case 'not-started':
      return (
        <div className="flex items-center space-x-2 p-2 dark:border light:bg-orange-100 rounded-md">
          <div className="size-4 bg-orange-500 rounded-full" />
          <h6 className="font-medium">{labels[status]}</h6>
        </div>
      );
    case 'scrapped':
      return (
        <div className="flex items-center space-x-2 p-2 dark:border light:bg-red-100 rounded-md">
          <div className="size-4 bg-red-500 rounded-full" />
          <h6 className="font-medium">{labels[status]}</h6>
        </div>
      );
  }
};

export default StatusLabel;
