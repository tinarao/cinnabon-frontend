'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { kanbansArrayValidator } from '@/validators/kanban.validator';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface PPProps {
  children: string;
  className?: string;
}

const ProjectsPopover = ({ children, className }: PPProps) => {
  const router = useRouter();
  const qc = useQueryClient();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['user-projects'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/kanban/my', {
        withCredentials: true,
      });

      console.log(res);

      const kanbans = kanbansArrayValidator.parse(res.data);
      return kanbans;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess]);

  const createKanban = async () => {
    const res = await axios.post(
      'http://localhost:3000/api/kanban',
      {},
      { withCredentials: true }
    );

    router.refresh();

    qc.invalidateQueries({ queryKey: ['user-projects'] });
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
          <div className="space-y-1 grid">
            {data?.map((i) => (
              <Button className="w-56" variant="outline" key={i._id}>
                {i.name}
              </Button>
            ))}
            <div className="py-1">
              <hr />
            </div>
            <Button
              size="sm"
              onClick={createKanban}
              variant="outline"
              className="w-full"
            >
              <PlusCircle className="size-4 mr-2" /> Создать проект
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ProjectsPopover;
