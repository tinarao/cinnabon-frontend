'use client';

import { Button } from '@/components/ui/button';
import { useForm } from '@tanstack/react-form';
import { useToast } from '@/components/ui/use-toast';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);

      const res = await axios.post(
        'http://localhost:3000/api/auth/login',
        {
          email: value.email,
          password: value.password,
        },
        { validateStatus: () => true, withCredentials: true }
      );

      switch (res?.status) {
        case 401:
          toast({
            title: 'Проверьте правильность введённых данных',
            description:
              'Пользователь с такими данными не существует. Вы точно правильно ввели пароль и почту?',
            variant: 'destructive',
          });
          break;
        case 201:
          router.replace('/dashboard');

        default:
          toast({
            title: 'Внутренняя ошибка сервера',
            description: 'Уже чиним!',
            variant: 'destructive',
          });
      }

      setIsLoading(false);
    },
  });

  return (
    <main className="flex h-screen justify-center items-center">
      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="email"
          children={(field) => (
            <div>
              <Label>Адрес электронной почты</Label>
              <Input
                disabled={isLoading}
                className="w-96"
                name={field.name}
                placeholder="E-mail"
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <div>
              <Label>Пароль</Label>
              <Input
                disabled={isLoading}
                className="w-96"
                placeholder="Пароль"
                type="password"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />
        <div className="py-2">
          <hr />
        </div>
        <Button disabled={isLoading}>Войти</Button>
      </form>
    </main>
  );
};

export default Page;
