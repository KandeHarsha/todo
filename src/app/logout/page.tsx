'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'

export default function Logout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    // Here you would typically handle the logout logic
    // For example, clearing local storage, cookies, or calling an API
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating an API call
    console.log('User logged out')
    // After logout, redirect to home page or login page
    router.push('/')
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            Confirm Logout
          </CardTitle>
          <CardDescription>Are you sure you want to log out?</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You will be signed out of your account and will need to log in again to access your information.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => router.back()} disabled={isLoggingOut}>
            Cancel
          </Button>
          <Button onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}