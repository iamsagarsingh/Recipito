import { useAuth } from "@/context/AuthContext"
import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function AuthLayout({children}:{children:ReactNode}){
    const navigate = useNavigate()
    const {state} = useAuth()
    
    useEffect(()=>{
        if(!state.status){
            navigate('/signin')
        }
    },[state.status])
    
    return <>
        {children}
    </>
}