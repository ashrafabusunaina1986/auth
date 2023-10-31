import React from 'react'
import classes from './EventItem.module.css'
import { Link, useRouteLoaderData, useSubmit } from 'react-router-dom'

function EventItem(props) {
  const token = useRouteLoaderData('Root')
  const submit = useSubmit()
  const DeleteHandler = () => {
    var process = window.confirm('Are you sure')
    if (process) {
      submit(null, { method: 'delete' })
    }
  }
  return (
    <>
      <div className={classes.item} id={props.event.id}  >
        <img src={props.event.image} alt={props.event.title} />
        <div className={classes.content}>
          <h3>{props.event.title}</h3>
          <time>Date:{props.event.date}</time>
          <p>{props.event.description}</p>
        </div>
      </div>
      {token && <main className={classes.main}>
        <Link to={`edit`} >Edit</Link>
        <button onClick={DeleteHandler}>Delete</button>
      </main>}
      <Link className={classes.back} to='..' relative='path' >Back</Link>
    </>
  )
}

export default EventItem