import React, { Suspense, useEffect } from 'react'
import { Await, Link, defer, json, redirect, useLoaderData, useParams, useRouteLoaderData } from 'react-router-dom'
import EventItem from '../components/EventItem'
import EventList from '../components/EventList'
import { getToken } from './../auth'
function EvenetDetailPage() {
  const { event, events } = useRouteLoaderData('event-details')

  return <>
  <Suspense fallback={<p style={{ textAlign: 'center' }}>LOADING...</p>}>
    <Await resolve={event}>
      {loadedEvent => <EventItem event={loadedEvent} />}
    </Await></Suspense>
    <Suspense fallback={<p style={{ textAlign: 'center' }}>LOADING...</p>}>
      <Await resolve={events} >
        {loadedEvent => <EventList events={loadedEvent} />}
      </Await>
    </Suspense>
  </>
}

export default EvenetDetailPage

async function loadEvent(id) {
  const response = await fetch(`https://auth-inky-alpha.vercel.app/events/${id}`)
  if (!response.ok) throw json({ message: 'could not find details selected event.' },
    { status: 500 })
  return await response.json()
}
async function loadEvents() {
  const response = await fetch(`https://auth-inky-alpha.vercel.app/events`)
  if (!response.ok) throw json({ message: 'could not find events.' },
    { status: 500 })
  return await response.json()
}
export function loader({ params }) {
  return defer({
    event: loadEvent(params.eventId),
    events: loadEvents()
  })
}

export async function action({ params, request }) {
  const eventId = params.eventId
  const token=getToken()
  const response = await fetch(`https://auth-inky-alpha.vercel.app/events/${eventId}`, {
    method: request.method,
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
  if (!response.ok) throw json({ message: 'could not item deleted' }, { status: 500 })
  else return redirect(`http://localhost:3000/events`)
}