import { RootState } from '@/lib/store'
import { redirect } from 'next/navigation'
import { ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface ProtectedProps {
  authentication : boolean,
  children : ReactElement
}

export default function Protected({children, authentication = true}: ProtectedProps) {
  const authStatus = useSelector((state: RootState) => state.auth.status)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if(authentication && !authStatus){
      redirect("/login")
    } else if(!authentication && authStatus){
      redirect("/")
    }
    setLoading(false)
  }, [authStatus, authentication])
  return(
    loading ? <div>...Loading</div> : <>{children}</> 
  )
}