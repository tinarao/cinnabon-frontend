'use client';

import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { kanbanValidator } from '@/validators/kanban.validator';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Cog, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import TasksList from './_components/tasks-lists';
import ProjectSettingsDropdown from './_components/project-settings-dropdown';
import { reqUri } from '@/lib/utils';

const ProjectIdPage = ({ params }: { params: { projectId: string } }) => {
  const router = useRouter();
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['project-page'],
    queryFn: async () => {
      const url = reqUri(`api/kanban/id/${params.projectId}`);
      const res = await axios.get(url, {
        withCredentials: true,
      });

      return kanbanValidator.parse(res.data);
    },
  });

  useEffect(() => {
    if (isError) {
      router.replace('/dashboard/projects');
    }
  }, [isError, router]);

  return (
    <div className="h-full py-2">
      {isLoading && (
        <div className="h-screen flex items-center justify-center">
          <Loading />
        </div>
      )}
      {isSuccess && (
        <div className="container h-full">
          <div className="group flex justify-between">
            <div className="flex space-x-2 items-center">
              {/* TODO: Editable h1 tag */}
              <h1
                title="Название проекта"
                className="text-4xl font-medium cursor-pointer"
              >
                {data.name}
              </h1>
              <Button
                className="hidden group-hover:inline-flex"
                variant="ghost"
                size="icon"
              >
                <Edit className="size-4" />
              </Button>
            </div>
            <ProjectSettingsDropdown project={data}>
              <Button variant="ghost" size="sm">
                <Cog className="size-4 mr-2" /> Настройки проекта
              </Button>
            </ProjectSettingsDropdown>
          </div>
          <TasksList />
        </div>
      )}
    </div>
  );
};

export default ProjectIdPage;
