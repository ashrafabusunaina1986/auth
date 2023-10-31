import React, { Suspense, useEffect, useState } from 'react'
import { Await, Link, defer, json } from 'react-router-dom'
import EventList from '../components/EventList'
import { useLoaderData } from 'react-router-dom'


function EventPage() {
  const { events } = useLoaderData()
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>LOADING...</p>}>
      <Await resolve={events} errorElement={<div>could not load events</div>}
      >
        {loadedEvent => <EventList events={loadedEvent} />}
      </Await>

    </Suspense>
  )
}
export default EventPage

async function loadEvents() {
  const response = await fetch('https://auth-inky-alpha.vercel.app/events')
  if (!response.ok) {
    throw json({ message: 'Could not fetch events.' },
      { status: 500 })
  } else {
    const events = await response.json()
    return events
  }
}
export function loader() {
  return defer({
    events: loadEvents()
  })
}

