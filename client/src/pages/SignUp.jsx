import { Button } from '../components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form'; // Import FormProvider
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Link ,useNavigate} from 'react-router-dom';
import { RouteSignIn} from '@/helpers/RouteName';
import { getEnv } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import GoogleLogin from '@/components/GoogleLogin';

const SignUp = () => {

    const navigate= useNavigate()
  // Define the form schema with Zod for validation
    const formSchema = z.object({
      name: z.string().min(3,'Name must be at least 3 characters long.'),
      email: z.string().email('Please enter a valid email address'),
      password: z.string().min(8, 'Password must be at least 8 characters long'),
      confirmPassword: z.string().refine(data=>data.password==data.confirmPassword,'Password and confirm password would be same.')
    });
  
    // Set up react-hook-form with Zod resolver for validation
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name:'',
        email: '',
        password: '',
        confirmPassword:'',
      },
    });
  
    // Handle form submission
    async function onSubmit(values) {
      
      try {
        const response= await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/register`,{
          method:'post',
          headers:{'Content-type':'application/json'},
          body: JSON.stringify(values)
        })

        const data=await response.json()
        if(!response.ok){
          return showToast('error',data.message)
        }

        navigate(RouteSignIn)
        showToast('success',data.message)

      } catch (error) {
        showToast('error',error.message)
      }
    } 
  
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {/* Wrap your form with FormProvider to provide context */}
      <Card className="w-[400px] p-5 ">
        <h1 className='text-2xl font-bold text-center mb-3'>Create Your Account</h1>
        
        <div className=''>
          <GoogleLogin/>
          <div className='border my-3 flex justify-center items-center'>
              <span className='absolute text-sm '>Or</span>
          </div>
        </div>
        
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="mb-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your password must be at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="mb-2">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password again" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your password must be at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='mt-3'>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <div className='mt-3 text-sm flex justify-center item-center gap-2'>
                <p>Already have account? </p>
                 <Link className='text-blue-500 hover:underline'
                 to={RouteSignIn}>Sign In</Link>
              </div>
            </div>
            
          </form> 
        </FormProvider>
      </Card>
      
    </div>
  )
}

export default SignUp