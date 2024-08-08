'use client';

import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { kanbanValidator } from '@/validators/kanban.validator';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import TasksList from './_components/tasks-lists';

const ProjectIdPage = ({ params }: { params: { projectId: string } }) => {
  const router = useRouter();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['project-page'],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/kanban/id/${params.projectId}`,
        {
          withCredentials: true,
        }
      );

      return kanbanValidator.parse(res.data);
    },
  });

  useEffect(() => {
    if (isError) {
      router.replace('/dashboard/projects');
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess]);

  return (
    <div className="h-full py-2">
      {isLoading && (
        <div className="h-screen flex items-center justify-center">
          <Loading />
        </div>
      )}
      {isSuccess && (
        <div className="container">
          <div title="Название проекта" className="group flex gap-x-4">
            {/* TODO: Editable h1 tag */}
            <h1 className="text-4xl font-medium cursor-pointer">{data.name}</h1>
            <Button
              className="hidden group-hover:inline-flex"
              variant="ghost"
              size="icon"
            >
              <Edit className="size-4" />
            </Button>
          </div>
          <TasksList />
        </div>
      )}
    </div>
  );
};

export default ProjectIdPage;
