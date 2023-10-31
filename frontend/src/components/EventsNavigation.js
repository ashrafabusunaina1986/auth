import React from 'react'
import { NavLink, useRouteLoaderData } from 'react-router-dom'
import classes from './EventsNavigation.module.css'

function EventNavigation() {
    const token = useRouteLoaderData('Root')
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to='/events'
                            className={({ isActive }) => isActive ? classes.active : undefined}
                            end
                        >All Events</NavLink>
                    </li>
                    {token && <li>
                        <NavLink to='new'
                            className={({ isActive }) => isActive ? classes.active : undefined}
                        >New Event</NavLink>
                    </li>}
                </ul>
            </nav>
        </header>
    )
}

export default EventNavigation