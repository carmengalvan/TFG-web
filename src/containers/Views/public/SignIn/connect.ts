import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useAuthActions } from '@/graphql/auth/useAuthActions';
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { paths } from '@/globals/paths';

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters'),
})

type FormValues = z.infer<typeof FormSchema>

export const defaultValues: FormValues = {
  email: '',
  password: '',
};

export const useConnect = () => {
  const { handleLogin } = useAuthActions();

  const { push } = useRouter();

  const {
    query: { email },
  } = useRouter();

  const trackedEmail = typeof email === 'string' ? email : undefined;

  const initialValues = useMemo(
    () => ({
      email: trackedEmail ?? defaultValues.email,
      password: defaultValues.password,
    }),
    [trackedEmail],
  );
  
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: initialValues,
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const onSubmit = async(values: FormValues) => {
    try{
      const response = await handleLogin({
        email: values.email,
        password: values.password,
      })
      if (!!response) await push(paths.public.home)
    }catch(error){
      console.error('Error en la solicitud al backend:', error)
    }
  }

  return {
    errors,
    register,
    onSubmit,
    isSubmitting,
  };
};
