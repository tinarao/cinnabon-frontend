import { Statuses, StatusesType, Task as TaskType } from '@/types/kanban.d';
import React, { Dispatch, SetStateAction } from 'react';
import StatusLabel from './task-status-label';
import TaskCard from './task';

interface TLProps {
  state: TaskType[];
  status: StatusesType;
  tasks: TaskType[];
  updateStateFn: Dispatch<SetStateAction<TaskType[]>>;
}

const TaskList = ({ status, tasks, updateStateFn, state }: TLProps) => {
  return (
    <div className="col-span-1">
      <StatusLabel status={status} />
      <div className="py-2">
        <hr />
      </div>
      <div className="space-y-2">
        {tasks.map((i) => (
          <TaskCard
            task={i}
            state={state}
            updateStateFn={updateStateFn}
            key={i.name + i.description + i.status.toString()}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
