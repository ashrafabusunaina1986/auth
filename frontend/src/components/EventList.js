import React from 'react'
import classes from './EventList.module.css'
import { Link } from 'react-router-dom'

function EventList({events}) {
  return (
    <div className={classes.events} >
        <h1 >All Events</h1>
        <ul className={classes.list} >
            {events.map(event=>{
                return <li key={event.id} className={classes.item} >
                    <Link to={`/events/${event.id}`}>
                        <img src={event.image} alt={event.title} />
                        <div className={classes.content}>
                            <h2>{event.title}</h2>
                            <time>{event.date}</time>
                        </div>
                    </Link>
                </li>
            })}
        </ul>
    </div>
  )
}

export default EventList