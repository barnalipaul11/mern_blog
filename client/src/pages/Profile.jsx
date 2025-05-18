import { Card, CardContent } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getEnv } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import { useDispatch, useSelector } from 'react-redux';

import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { useFetch } from '@/hooks/useFetch';
import Loading from '@/components/Loading';
import { IoIosCamera } from "react-icons/io";
import Dropzone from 'react-dropzone';
import { setUser } from '@/redux/user/user.slice';




const Profile = () => {
    const [filePreview,setPreview]=useState()
    const [file,setFile]=useState()
    const dispath =useDispatch()
    const user = useSelector((state) => state.user) // Accessing user from Redux store

    
    const { data: userData, loading, error } = useFetch(
       `${getEnv('VITE_API_BASE_URL')}/user/get-user/${user.user._id}` , // Make sure to only fetch if userId exists
        {
            method: 'get',
            credentials: 'include',
        }
    )
    
   

      const formSchema = z.object({
        name: z.string().min(3,'Name must be at least 3 character long.'),
        email: z.string().email(),
        bio : z.string().min(3,'Bio must be at least 3 character long.'),
        password: z.string(),
      });
    
      // Set up react-hook-form with Zod resolver for validation
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name:'',
          email: '',
          bio:'',
          password: '',

        },
      })
      useEffect(() => {
      if (userData && userData.success) {
        form.reset({
          name: userData.user.name ,
          email: userData.user.email ,
          bio: userData.user.bio ,
          password: '',
        })

      }
    }, [userData]);

      
      // Handle form submission
      async function onSubmit(values) {
            
            try {
              const formData=new FormData()
              formData.append('file',file)
              formData.append('data',JSON.stringify(values))

              const response= await fetch(`${getEnv('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`,{
                method:'put',
                credentials:'include',
                body:formData
              })
      
              const data=await response.json()
              if(!response.ok){
                 showToast('error',data.message)
              }
              
                dispath(setUser(data.user))
                showToast('success',"User data updated successfully")
            } catch (error) {
              showToast('error',error.message)
            }
      } 

  const handleFileSelection = (files) => {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      setFile(file)
      setPreview(preview);
   }

  if(loading) return  <Loading/>  
  return (
    <Card className='max-w-screen-md mx-auto'>
       
        <CardContent>
            <div className="flex justify-center items-center mt-10">
                  <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                      
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                         <Avatar className="w-28 h-28 relative group">
                          <AvatarImage src={filePreview?filePreview:userData?.user?.avatar} />

                          <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black bg-opacity-20 border-2 border-red-600 rounded-full group-hover:flex hidden cursor-pointer">
                          <IoIosCamera color="hsl(346.8, 77.2%, 49.8%)" />
                          </div>
                        </Avatar>
                        </div>
                    )}
                  </Dropzone>
                     
            </div>

            <div>
                 <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        name="bio"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea type="" placeholder="Enter your bio" {...field} />

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
                    <Button type="submit" className="w-full">
                        Save Changes
                    </Button>
                    <div className='mt-3'>
                    
                    
                    </div>
                    
                </form> 
            </FormProvider>
            </div>
            
        </CardContent>
       
    </Card>
  )
}

export default Profile
