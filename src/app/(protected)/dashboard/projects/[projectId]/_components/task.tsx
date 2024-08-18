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
import { useToast } from '@/components/ui/use-toast';
import { enumFromStringValue } from '@/lib/utils';
import { Statuses, StatusesType, Task } from '@/types/kanban.d';
import { PlusCircle } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { nanoid } from 'nanoid';

interface TCProps {
  task: Task;
  updateStateFn: Dispatch<SetStateAction<Task[]>>;
  state: Task[];
}

interface ATProps {
  updateStateFn: Dispatch<SetStateAction<Task[]>>;
  state: Task[];
}

const TaskCard = ({ task, updateStateFn, state }: TCProps) => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          title={`Нажмите, чтобы увидеть подробности о задаче \"${task.name}\"`}
          className="whitespace-nowrap overflow-hidden text-ellipsis p-3 border rounded-md hover:shadow-md transition cursor-pointer"
        >
          {task.name}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Задача "{task.name}"</DialogTitle>
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
  );
};

TaskCard.addTask = ({ state, updateStateFn }: ATProps) => {
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
    <Button onClick={handleAddTask} className="w-full" variant="ghost">
      <PlusCircle className="size-4" />
    </Button>
  );
};

export default TaskCard;
