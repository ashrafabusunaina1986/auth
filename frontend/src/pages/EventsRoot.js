import React from 'react'
import { Outlet } from 'react-router-dom'
import EventNavigation from '../components/EventsNavigation'

function EventsRootLayout() {
  return (
    <>
     <EventNavigation/>
     <main>
        <Outlet/>
     </main>
    </>
  )
}

export default EventsRootLayout