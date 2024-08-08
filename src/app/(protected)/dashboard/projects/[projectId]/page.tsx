'use client';

import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import {
  kanbanValidator,
  kanbansArrayValidator,
} from '@/validators/kanban.validator';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

  return (
    <div>
      {isLoading && (
        <div className="h-screen flex items-center justify-center">
          <Loading />
        </div>
      )}
      {isSuccess && (
        <div className="container">
          {/* TODO: Editable h1 tag */}
          <h1 className="text-3xl font-medium cursor-pointer">{data.name}</h1>
        </div>
      )}
    </div>
  );
};

export default ProjectIdPage;
