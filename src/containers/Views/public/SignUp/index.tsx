"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { paths } from '@/globals/paths';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import RootLayout from "@/containers/Layout/Forms"
import Link from "next/link"
import Auth from "@/components/Auth"
import { from, useMediaQuery } from "@/styles/media"
import { useConnect } from "./connect"
import { useRouter } from "next/router"

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters'),
  public_name: z.string().min(1, 'Public name is required'),
})

export function SignUpView(){
  const isMobile = !useMediaQuery(from.tabletLandscape);
  
  const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
  });

  const { push } = useRouter();

  const {
    handleRegister,
    isLoading,
  } = useConnect();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values)
    try {
      const response = await handleRegister({
        email: values.email,
        firstName: values.first_name,
        lastName: values.last_name,
        password: values.password,
        publicName: values.public_name,
      });

      if (!!response) await push(paths.public.home);

    } catch (error) {
      console.error('Error en la solicitud al backend:', error);
    }
  };

  return (
    <RootLayout>
      <Auth imageSrc='/images/business_and_work_planning.png'>
        <div className={`mx-auto bg-gray-200 p-8 rounded-3xl shadow-md ${isMobile ? 'w-full' : 'w-2/5'}`}>
          <p className="text-center text-2xl">Crea tu cuenta</p>
          <div className="mx-auto bg-white p-8 rounded-3xl shadow-md w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="mail@example.com" 
                        type = 'email'
                        {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" 
                        type = 'name'
                        {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellidos</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" 
                        type = 'last_name'
                        {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input 
                        type = 'password'
                        placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="public_name"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Nombre de usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" 
                        type = 'public_name'
                        {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-center">
                  <Button type="submit">REGISTRARSE</Button>
                </div>
              </form>
              <div className="mx-auto my-4 flex w-full items-center justify-evenly
              before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400
              after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                o
              </div>
              <p className="text-center text-sm text-black mt-2">
                ¿Ya tienes cuenta?
                <Link className='text-teal-600' href='/login'> Inicia sesión</Link>
              </p>
            </Form>
          </div>
        </div>
      </Auth>
    </RootLayout>
  )
}