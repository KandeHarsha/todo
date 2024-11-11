'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Protected from '@/components/AuthLayout'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useDispatch } from 'react-redux'
import { login } from '@/lib/features/auth/authSlice'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type LoginValues = z.infer<typeof loginSchema>

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange', // Enables live validation and isValid tracking
    defaultValues: {
      email: '',
      password: ''
    },
  })
  const { isValid } = form.formState

  const onSubmit = async (values: LoginValues) => {
    setIsSubmitting(true)
    const payload = {
      email: values.email,
      password: values.password
    }
    console.log('Sign up attempted with:', values)
    try {
      const response = await fetch('api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error('Failed to Login')
      }
      dispatch(login(payload))
      setIsSubmitting(false)
    } catch (error) {
      console.error('Sign up failed:', error);      
    }
    
  }

  return (
    <Protected authentication={false}>
      <div className='flex justify-center items-center h-screen'>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
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
                    <Label>Password</Label>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don`&apos;t have an account? <a href="/register" className="text-primary hover:underline">Sign up</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Protected>
  )
}