'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { reqUri } from '@/lib/utils';
import {
  kanbanValidator,
  kanbansArrayValidator,
} from '@/validators/kanban.validator';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { List, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PPProps {
  children: string;
  className?: string;
}

const ProjectsPopover = ({ children, className }: PPProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['user-projects'],
    queryFn: async () => {
      const url = reqUri('api/kanban/my');
      const res = await axios.get(url, {
        withCredentials: true,
      });

      const kanbans = kanbansArrayValidator.parse(res.data);
      return kanbans;
    },
  });

  const createKanban = async () => {
    const url = reqUri('api/kanban');
    const res = await axios.post(url, {}, { withCredentials: true });

    toast({
      title: 'Новый проект успешно создан!',
    });

    const kanban = kanbanValidator.parse(res.data);
    router.replace(`dashboard/projects/${kanban._id}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className={className}>
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        {data?.length === 0 && (
          <Button onClick={createKanban} variant="outline" className="m-2">
            <PlusCircle className="size-4 mr-2" /> Создать проект
          </Button>
        )}
        {data?.length !== 0 && (
          <div className="grid space-y-1">
            {data?.map((i) => (
              <Button asChild className="w-56" variant="outline" key={i._id}>
                <Link href={`/dashboard/projects/${i._id}`}>{i.name}</Link>
              </Button>
            ))}
            <div className="py-1">
              <hr />
            </div>
            <Button size="sm" variant="outline" asChild>
              <Link href="/dashboard/projects">
                <List className="size-4 mr-2" />
                Все проекты
              </Link>
            </Button>
            <Button size="sm" onClick={createKanban} variant="outline">
              <PlusCircle className="size-4 mr-2" /> Создать проект
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ProjectsPopover;
