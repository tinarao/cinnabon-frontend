import { Statuses, Task } from '@/types/kanban.d';
import { useState } from 'react';
import TaskList from './task-list-col';

const tasksMock: Array<Task> = [
  {
    name: 'Помыть посуду',
    status: Statuses.NotStarted,
  },
  {
    name: 'Помыть кота',
    status: Statuses.InProgress,
  },
  {
    name: 'Попить кофе',
    status: Statuses.NotStarted,
    description: 'Люблю пить кофе. Надо попить кофе.',
  },
  {
    name: 'Погулять',
    status: Statuses.Completed,
  },
  {
    name: 'Не разочаровать родителей',
    status: Statuses.Scrapped,
  },
];

const TasksLists = () => {
  const [tasks, setTasks] = useState<Array<Task>>(tasksMock);

  const inProgress = tasks.filter((i) => i.status === Statuses.InProgress);
  const completed = tasks.filter((i) => i.status === Statuses.Completed);
  const scrapped = tasks.filter((i) => i.status === Statuses.Scrapped);
  const notStarted = tasks.filter((i) => i.status === Statuses.NotStarted);

  return (
    <>
      <div className="py-2">
        <hr />
      </div>
      <div className="grid grid-cols-4 gap-x-4">
        <TaskList
          state={tasks}
          updateStateFn={setTasks}
          status={Statuses.NotStarted}
          tasks={notStarted}
        />
        <TaskList
          state={tasks}
          updateStateFn={setTasks}
          status={Statuses.InProgress}
          tasks={inProgress}
        />
        <TaskList
          state={tasks}
          updateStateFn={setTasks}
          status={Statuses.Completed}
          tasks={completed}
        />
        <TaskList
          state={tasks}
          updateStateFn={setTasks}
          status={Statuses.Scrapped}
          tasks={scrapped}
        />
      </div>
    </>
  );
};

export default TasksLists;
