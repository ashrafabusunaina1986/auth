import { redirect } from "react-router-dom"

export function getToken(){
    return localStorage.getItem('token')
}
export function getExpireDate(){
    const storedExpire=localStorage.getItem('expire')
    const expireDate=new Date(storedExpire)
    const now=new Date()
    const duration=expireDate-now
    return duration
}

export function tokenLoader(){
    return getToken()
}

export function checkLoader(){
    const token=getToken()
    if(!token) return redirect('/auth')
    const expire=getExpireDate()
    if(expire<0)return 'EXPIRED'

    return token
}