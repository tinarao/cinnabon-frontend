import { Statuses, Task } from '@/types/kanban.d';
import { useState } from 'react';
import TaskList from './task-list-col';
import { useBlur } from '@/hooks/useBlur';
import axios from 'axios';
import { reqUri } from '@/lib/utils';

const tasksMock: Array<Task> = [
  {
    id: '0',
    name: 'Помыть посуду',
    status: Statuses.NotStarted,
  },
  {
    id: '1',
    name: 'Помыть кота',
    status: Statuses.InProgress,
  },
  {
    id: '2',
    name: 'Попить кофе',
    status: Statuses.NotStarted,
    description: 'Люблю пить кофе. Надо попить кофе.',
  },
  {
    id: '3',
    name: 'Погулять',
    status: Statuses.Completed,
  },
  {
    id: '4',
    name: 'Не разочаровать родителей',
    status: Statuses.Scrapped,
  },
];

const TasksLists = ({
  kanbanId,
  p_tasks,
}: {
  kanbanId: string;
  p_tasks: Array<Task>;
}) => {
  const [tasks, setTasks] = useState<Array<Task>>(p_tasks);

  const inProgress = tasks.filter((i) => i.status === Statuses.InProgress);
  const completed = tasks.filter((i) => i.status === Statuses.Completed);
  const scrapped = tasks.filter((i) => i.status === Statuses.Scrapped);
  const notStarted = tasks.filter((i) => i.status === Statuses.NotStarted);

  useBlur(async () => {
    const res = await axios.patch(
      reqUri(`api/kanban/${kanbanId}`),
      {
        tasks,
      },
      {
        withCredentials: true,
      }
    );

    console.log('Got /patch response: ', res);
  });

  return (
    <>
      <div className="py-2">
        <hr />
      </div>
      <div className="grid grid-cols-4 gap-x-2 h-full">
        <TaskList
          state={tasks}
          updateStateFn={setTasks}
          status="not-started"
          tasks={notStarted}
        />
        <TaskList
          state={tasks}
          updateStateFn={setTasks}
          status="in-progress"
          tasks={inProgress}
        />
        <TaskList
          state={tasks}
          updateStateFn={setTasks}
          status="completed"
          tasks={completed}
        />
        <TaskList
          state={tasks}
          updateStateFn={setTasks}
          status="scrapped"
          tasks={scrapped}
        />
      </div>
    </>
  );
};

export default TasksLists;
