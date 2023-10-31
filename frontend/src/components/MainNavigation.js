import React from 'react'
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom'
import classes from './MainNavigation.module.css'
import NewslettersSignup from './NewslettersSignup'

function MainNavigation() {
    const token = useRouteLoaderData('Root')

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to='/'
                            className={({ isActive }) => isActive ? classes.active : undefined} end
                        >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/events'
                            className={({ isActive }) => isActive ? classes.active : undefined}
                        >Events</NavLink>
                    </li>
                    <li>
                        <NavLink to='/newsletter'
                            className={({ isActive }) => isActive ? classes.active : undefined}
                        >New letter</NavLink>
                    </li>
                    {!token && <li>
                        <NavLink to='/auth?mode=login'
                            className={({ isActive }) => isActive ? classes.active : undefined}
                        >Authentication</NavLink>
                    </li>}
                    {token && <li>
                        <Form action='/logout' method='post'>
                            <button>Logout</button>
                        </Form>
                    </li>}
                </ul>
            </nav>
            <NewslettersSignup />
        </header>
    )
}

export default MainNavigation