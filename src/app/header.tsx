'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { User, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { logout } from '@/lib/features/auth/authSlice'
import { useDispatch } from 'react-redux'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        setUser(data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }, [])
  
  const handleLogout = async() => {
    const response = await fetch('/api/users/logout', {
      method: 'GET',
      headers: {"Content-type": "application/json"},
    })
    console.log('response', response)
    if(!response.ok) {
      console.log('error')
      return
    }
    dispatch(logout())
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch("api/users/loggedin-user",{
        method: "GET",
        headers: {"Content-type": "application/json"},
      })
      if(!response.ok) {
        console.log('error')
        return
      }
      const data = await response.json()
      console.log('data', data)
      return data.data
    } catch (error: any) {
      console.log('error', error)
    }
  } 

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-2xl font-bold text-primary">Logo</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-foreground">{user?.username}</span>
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}