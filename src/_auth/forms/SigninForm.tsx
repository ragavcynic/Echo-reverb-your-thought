import React from 'react'
import { z } from "zod"
import {Link, useNavigate} from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { signInValidation} from '@/lib/validation'
import { Button } from '@/components/ui/button'
import { Toast } from '@radix-ui/react-toast'
import { useForm } from "react-hook-form"


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Loader } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import {  useSignInAccount } from '@/lib/react-query/queriesAndMutaions'
import { useUserContext } from '@/context/AuthContext'
const SigninForm = () => {
    const {checkAuthUser, isLoading:IsUserLoading} = useUserContext();
    const {toast} = useToast();
    const navigate = useNavigate()
    const isLoading = false;
    const {mutateAsync: signInAccount } = useSignInAccount();
    const form = useForm<z.infer<typeof signInValidation>>({
        resolver: zodResolver(signInValidation),
        defaultValues: {
          email:"",
          password:""
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof signInValidation>) {
       const session = await signInAccount({
        email:values.email,
        password:values.password
       })
       if(!session){
        return toast({
            title: "Sign in failed. Try Again..",
          });
       }
       const isLoggedIn = await checkAuthUser();
       if(isLoggedIn){
        form.reset()
        navigate("/")
       }else{
        return toast({title:"Sign up failed. please try again"})
       }

      }
  return (

       <Form {...form}>
        <div className='sm:w-420 flex-center flex-col'>
            <img src="/assets/images/echo.png" alt="logo" />
            <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Login To ur Account</h2>
            <p className='text-light-3 small-medium md:base-regular mt-12'>WELCOME BACK!!!</p>
       
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-5 w-full mt-4">
           
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type='email' className='shad-input' {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type='password' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" className='shad-button_primary ml-50 mt-5'>{
            IsUserLoading?(
                <div className='flex-center gap-2'>
                    <Loader/> Loading...
                </div>
            ):("Sign In")
            }</Button>
            <p className='text-small-regular text-light-2 text-center mt-2'>
                Don't have an account? 
                <Link to="/sign-up" 
                className='text-primary-500 ml-1 text-small-semibold'>
                    Sign-up
                </Link>
            </p>
        </form>
      </div>
    </Form>

  )
}

export default SigninForm
