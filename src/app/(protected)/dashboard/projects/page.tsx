'use client';

import { Button } from '@/components/ui/button';
import { reqUri } from '@/lib/utils';
import { kanbansArrayValidator } from '@/validators/kanban.validator';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';

const Page = () => {
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

  return (
    <div className="container">
      <h1 className="text-4xl font-medium">Проекты</h1>
      <div className="py-1">
        <hr />
      </div>
      {isSuccess && (
        <div className="grid grid-cols-4 gap-4 pt-2">
          {data.length ? (
            data.map((pr) => (
              <article
                className="border p-2 rounded-md hover:shadow-md cursor-pointer transition"
                key={pr._id}
              >
                <h5 className="font-medium text-lg">{pr.name}</h5>
                <Button asChild size="icon" variant="outline">
                  <Link href={`/dashboard/projects/${pr._id}`}>
                    <ChevronRight className="size-4" />
                  </Link>
                </Button>
              </article>
            ))
          ) : (
            <div className="size-full bg-orange-100">
              <h2>Тут пусто!</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
