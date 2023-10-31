import React, { Suspense } from 'react'
import EventForm from '../components/EventForm'
import { Await, json, redirect, useRouteLoaderData } from 'react-router-dom'

function EditEventPage() {
  const {event} = useRouteLoaderData('event-details')

  return <Suspense fallback={<p>Loading</p>}>
    <Await resolve={event} errorElement={<div>could not load evevt</div>}>
      {loadevent=><EventForm method='PATCH' event={loadevent} />}
    </Await>
  </Suspense>
}

export default EditEventPage

