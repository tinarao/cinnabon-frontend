'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { reqUri } from '@/lib/utils';
import { Kanban } from '@/types/kanban';
import axios from 'axios';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PSDProps {
  project: Kanban;
  children: React.ReactNode;
}

const ProjectSettingsDropdown = ({ project, children }: PSDProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const deleteProjectHandler = async () => {
    const url = reqUri(`api/kanban/${project._id}`);
    const res = await axios.delete(url, { withCredentials: true });

    toast({
      title: 'Проект удалён!',
    });

    router.replace('/dashboard');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{project.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={deleteProjectHandler}
          className="cursor-pointer"
        >
          <Trash2Icon className="size-4 mr-2" /> Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectSettingsDropdown;
