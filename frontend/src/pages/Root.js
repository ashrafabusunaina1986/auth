import React, { useEffect } from 'react'
import MainNavigation from '../components/MainNavigation'
import { Outlet,useLoaderData,useNavigation, useSubmit } from 'react-router-dom'
import { getExpireDate } from '../auth'

function RootLayout() {
  const navigation=useNavigation()
  const idle=navigation.state='idle'
  const submitting=navigation.state='submitting'
  const loading=navigation.state='loading'
  const token=useLoaderData()
  const submit=useSubmit()

  useEffect(()=>{
    if(!token)return

    if(token==='EXPIRED'){
      submit(null,{action:'/logout',method:'post'})
      return
    }
    const expire=getExpireDate()
    setTimeout(()=>{
      submit(null,{action:'/logout',method:'post'})
    },expire)
  },[token,submit])
  return (
    <div>
        <MainNavigation/>
        <main>
          {/* {loading && <h1>loading...</h1> } */}
            <Outlet/>
        </main>
    </div>
  )
}

export default RootLayout