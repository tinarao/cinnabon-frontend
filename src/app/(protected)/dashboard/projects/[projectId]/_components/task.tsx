import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, enumFromStringValue } from '@/lib/utils';
import { Statuses, StatusesType, Task } from '@/types/kanban.d';
import { FileQuestion, PlusCircle } from 'lucide-react';
import { Dispatch, SetStateAction, memo, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useDrag } from 'react-dnd';

interface TCProps {
  task: Task;
  updateStateFn: Dispatch<SetStateAction<Task[]>>;
  state: Task[];
}

interface ATProps {
  updateStateFn: Dispatch<SetStateAction<Task[]>>;
  state: Task[];
}

const TaskCard = memo(({ task, updateStateFn, state }: TCProps) => {
  const [dragOpts, drag] = useDrag({
    type: 'item',
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const changeStatus = (newStatus?: Statuses) => {
    if (!newStatus) return;

    const prevState = state.filter((i) => i !== task);
    const newTasks: Task[] = [
      ...prevState,
      {
        id: nanoid(),
        name: task.name,
        description: task.description,
        status: newStatus,
      },
    ];
    updateStateFn(newTasks);
  };

  return drag(
    <div
      id={task.id}
      className={cn(
        'flex cursor-grab h-16 items-center justify-between bg-background group whitespace-nowrap overflow-hidden text-ellipsis px-3 py-4 border rounded-md hover:shadow-md transition',
        dragOpts.isDragging ? 'opacity-50' : 'opacity-100'
      )}
    >
      <span>{task.name}</span>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="hidden group-hover:inline-flex"
          >
            <FileQuestion className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Задача &quot;{task.name}&quot;</DialogTitle>
            <DialogDescription>{task.description}</DialogDescription>
          </DialogHeader>

          <div>
            <Select
              onValueChange={(e) => {
                const newStatus = enumFromStringValue(Statuses, e);
                changeStatus(newStatus);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Изменить статус задачи" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Statuses.Completed}>Завершено</SelectItem>
                <SelectItem value={Statuses.InProgress}>В процессе</SelectItem>
                <SelectItem value={Statuses.NotStarted}>Не начата</SelectItem>
                <SelectItem value={Statuses.Scrapped}>Заброшена</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export const AddTask = memo(({ state, updateStateFn }: ATProps) => {
  const handleAddTask = () => {
    const newState: Task[] = [
      ...state,
      {
        id: nanoid(),
        name: 'Новая задача',
        status: Statuses.NotStarted,
      },
    ];
    updateStateFn(newState);
  };

  return (
    <>
      <div className="py-2">
        <hr />
      </div>
      <Button onClick={handleAddTask} className="w-full" variant="ghost">
        <PlusCircle className="size-4" />
      </Button>
    </>
  );
});

TaskCard.displayName = 'TaskCard';
AddTask.displayName = 'AddTask';

export default TaskCard;
