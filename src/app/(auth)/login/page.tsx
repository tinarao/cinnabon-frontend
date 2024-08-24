'use client';

import { Button } from '@/components/ui/button';
import { useForm } from '@tanstack/react-form';
import { useToast } from '@/components/ui/use-toast';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { reqUri } from '@/lib/utils';

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

      const url = reqUri('api/auth/login');
      const res = await axios.post(
        url,
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
          setIsLoading(false);
          router.replace('/dashboard');
          break;
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
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <title>Авторизация | Cinnabon.js </title>
      <form.Field name="email">
        {(field) => (
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
      </form.Field>

      <form.Field name="password">
        {(field) => (
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
      </form.Field>
      <div className="py-2">
        <hr />
      </div>
      <div className="flex justify-between items-center">
        <Button disabled={isLoading}>Войти</Button>
        <Button asChild type="button" size="sm" variant="link">
          <Link href="/register">У меня нет аккаунта</Link>
        </Button>
      </div>
    </form>
  );
};

export default Page;
