import React, { useEffect } from 'react'
import classes from './NewslettersSignup.module.css'
import { Form, useFetcher,useActionData } from 'react-router-dom'

function NewslettersSignup() {
    const fetcher = useFetcher()
    const { data, state } = fetcher
    useEffect(() => {
        if (state === 'idle' && data && data.message) {
            alert(data.message)
            console.log(data.message)
        }
    }, [])
    return (
        <fetcher.Form method="POST" action='/newsletter' className={classes.newsletter}>
            <input type="email"
                name='email'
                placeholder='Sign up for newsletter...'
                aria-label='Sign up for newsletter' />
            <button >Sign up</button>
        </fetcher.Form>
    )
}

export default NewslettersSignup