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
import { enumFromStringValue } from '@/lib/utils';
import { Statuses, Task } from '@/types/kanban.d';
import { Dispatch, SetStateAction } from 'react';

interface TCProps {
  task: Task;
  updateStateFn: Dispatch<SetStateAction<Task[]>>;
  state: Task[];
}

const TaskCard = ({ task, updateStateFn, state }: TCProps) => {
  const changeStatus = (newStatus?: Statuses) => {
    if (!newStatus) return;

    const prevState = state.filter((i) => i !== task);
    const newTasks: Task[] = [
      ...prevState,
      { name: task.name, description: task.description, status: newStatus },
    ];
    updateStateFn(newTasks);
  };

  return (
    <Dialog onOpenChange={(e) => console.log(e)}>
      <DialogTrigger asChild>
        <div
          title={`Нажмите, чтобы увидеть подробности о задаче \"${task.name}\"`}
          className="p-3 border rounded-md hover:shadow-md transition cursor-pointer"
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

export default TaskCard;
