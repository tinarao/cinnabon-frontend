'use client';

import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { kanbanValidator } from '@/validators/kanban.validator';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Check, Cog, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TasksList from './_components/tasks-lists';
import ProjectSettingsDropdown from './_components/project-settings-dropdown';
import { reqUri } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

const ProjectIdPage = ({ params }: { params: { projectId: string } }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState<string | undefined>(undefined);
  const { toast } = useToast();
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

  const handleProjectNameChange = async () => {
    const res = axios
      .patch(
        reqUri(`api/kanban/name/${data?._id}/${projectName}`),
        {},
        { withCredentials: true }
      )
      .then((r) => {
        if (r.status !== 200) {
          toast({
            title: 'Не удалось изменить имя проекта',
            description:
              'Возникла ошибка при изменении имени проекта. Попробуйте ещё раз через некоторое время.',
          });
        } else {
          toast({ title: 'Имя проекта успешно изменено!', variant: 'info' });
        }
      });
  };

  useEffect(() => {
    if (isError) {
      router.replace('/dashboard/projects');
    }
  }, [isError, router]);

  useEffect(() => {
    if (isSuccess) {
      setProjectName(data.name);
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
        <div className="container h-full">
          <div className="group flex justify-between">
            <div className="flex space-x-2 items-center">
              {/* TODO: Editable h1 tag */}
              {isEditing ? (
                <>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      handleProjectNameChange();
                    }}
                    variant="outline"
                    size="icon"
                  >
                    <Check className="size-4" />
                  </Button>
                  <input
                    className="text-4xl p-0 m-0 font-medium w-min border-b-2"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsEditing(false);
                        handleProjectNameChange();
                      }
                    }}
                  />
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="ghost"
                    size="icon"
                  >
                    <Edit className="size-4" />
                  </Button>
                  <h1
                    title="Название проекта"
                    className="text-4xl font-medium cursor-pointer"
                  >
                    {projectName}
                  </h1>
                </>
              )}
            </div>
            <ProjectSettingsDropdown project={data}>
              <Button variant="ghost" size="sm">
                <Cog className="size-4 mr-2" /> Настройки проекта
              </Button>
            </ProjectSettingsDropdown>
          </div>
          <TasksList p_tasks={data.tasks} kanbanId={data._id} />
        </div>
      )}
    </div>
  );
};

export default ProjectIdPage;
