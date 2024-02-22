import React from 'react'
import { z } from "zod"
import {Link, useNavigate} from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpValidation } from '@/lib/validation'
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
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutaions'
import { useUserContext } from '@/context/AuthContext'
const SignupForm = () => {
    const {checkAuthUser, isLoading:IsUserLoading} = useUserContext();
    const {toast} = useToast();
    const navigate = useNavigate()
    const isLoading = false;
    const {mutateAsync : createUserAccount,
         isPending : isCreatingAccount} = useCreateUserAccount();
    const {mutateAsync: signInAccount, isPending:isSignedIn } = useSignInAccount();
    const form = useForm<z.infer<typeof signUpValidation>>({
        resolver: zodResolver(signUpValidation),
        defaultValues: {
            name:"",
          username: "",
          email:"",
          password:""
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof signUpValidation>) {
       //create the user
       const newUser = await createUserAccount(values);
       console.log(newUser)
       if(!newUser){
        return toast({
            title: "Sign up failed. Try Again..",
          });
       }
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
            <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new account</h2>
            <p className='text-light-3 small-medium md:base-regular mt-12'>To use snapgram enter ur account details</p>
       
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col gap-5 w-full mt-4">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
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
            isCreatingAccount?(
                <div className='flex-center gap-2'>
                    <Loader/> Loading...
                </div>
            ):("Sign up")
            }</Button>
            <p className='text-small-regular text-light-2 text-center mt-2'>
                Already have an account? 
                <Link to="/sign-in" 
                className='text-primary-500 ml-1 text-small-semibold'>
                    Sign-in
                </Link>
            </p>
        </form>
      </div>
    </Form>

  )
}

export default SignupForm
