'use client';

import {
  Statuses,
  StatusesType,
  Task,
  Task as TaskType,
} from '@/types/kanban.d';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import StatusLabel from './task-status-label';
import TaskCard from './task';
import { useDrop } from 'react-dnd';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface TLProps {
  state: TaskType[];
  status: StatusesType;
  tasks: TaskType[];
  updateStateFn: Dispatch<SetStateAction<TaskType[]>>;
}

const TaskList = ({ status, tasks, updateStateFn, state }: TLProps) => {
  const { toast } = useToast();
  const [{ isOver }, drop] = useDrop({
    accept: 'item',
    drop: (item: Task) => {
      console.log(`Change ${item.name} status to ${status}`);

      let newState: Array<Task> = [];
      state.forEach((task) => {
        if (task.id == item.id) {
          task.status = status as Statuses;
        }

        newState.push(task);
      });

      updateStateFn(newState);
      toast({
        title: 'Статус задачи изменён!',
        description: `Задача "${item.name}" теперь имеет статус "${status}"`,
        variant: 'info',
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return drop(
    <div
      id={`task-ct-${status}`}
      className={cn(
        'col-span-1 h-full px-2 pt-2',
        isOver ? 'dark:bg-neutral-900 bg-neutral-50' : 'bg-background'
      )}
    >
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
            key={i.id + i.name}
          />
        ))}
        {status === 'not-started' && (
          <TaskCard.addTask state={state} updateStateFn={updateStateFn} />
        )}
      </div>
    </div>
  );
};

export default TaskList;
