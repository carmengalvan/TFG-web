"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import RootLayout from "@/containers/Layout/Forms"
import Link from "next/link"
import Auth from "@/components/Auth"
import { useConnect } from "./connect"
import { onPromise } from "@/utils/onPromise"

const FormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters'),
})

export function SignInView(){
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const { onSubmit, isSubmitting } = useConnect()

    return (
        <RootLayout>
            <Auth imageSrc='/images/inicio_sesion.png'>
                <div className="mx-auto bg-gray-200 p-8 rounded-3xl shadow-md w-full md:w-2/5">
                    <p className="text-center text-2xl">Inicia sesión</p>
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
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
                                <div className="text-right">
                                <Link className='text-teal-600 text-sm' href='/'>¿Has olvidado tu contraseña?</Link>
                                </div>
                                <br></br>
                                <div className="text-center">
                                    <Button disabled={isSubmitting} type="submit">INICIAR SESIÓN</Button>
                                </div>
                            </form>
                            <div className="mx-auto my-4 flex w-full items-center justify-evenly
                            before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400
                            after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                            o
                            </div>
                            <p className="text-center text-sm text-black mt-2">
                            ¿No tienes cuenta?
                                <Link className='text-teal-600' href='/register'> Regístrate</Link>
                            </p>
                        </Form>
                    </div>
                </div>
            </Auth>
        </RootLayout>
      )
}