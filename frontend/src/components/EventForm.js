import React from 'react'
import classes from './editform.module.css'
import { Form, json, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom'
import { getToken } from '../auth'

function EventForm({ method, event }) {
    const data = useActionData()
    const navigate = useNavigate()
    const navigation = useNavigation()

    const isSubmitting = navigation.state === 'submitting'

    const backHandler = () => {
        navigate('..')
    }
    return (
        <Form method={method} className={classes.form}>
            {data && data.errors && <div className={classes.errors}>
                <ul>
                    {Object.values(data.errors).map((err, ind) => {
                        return <li key={ind} >{err}</li>
                    })}

                </ul></div>}

            <div>
                <label htmlFor="title">Title</label>
                <input required type="text" id='title' name='title' defaultValue={event ? event.title : ''} />
            </div>
            <div>
                <label htmlFor="image">Image</label>
                <input required type="url" id='image' name='image' defaultValue={event ? event.image : ''} />
            </div>
            <div>
                <label htmlFor="date">Date</label>
                <input required type="date" id='date' name='date' defaultValue={event ? event.date : ''} />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea required id='description' name='desc' defaultValue={event ? event.description : ''} ></textarea>
            </div>
            <div className={classes.actions}>
                <button className={`${classes.save} ${classes.active} `} disabled={isSubmitting} >
                    {isSubmitting ? 'Submitting...' : 'Save'}
                </button>
                <button onClick={backHandler} className={classes.cancel} type='button' disabled={isSubmitting} >
                    Cancel
                </button>
            </div>
        </Form>
    )
}

export default EventForm

export async function action({ request, params }) {
    const method = request.method
    const data = await request.formData()
    const eventData = {
        title: data.get('title'),
        image: data.get('image'),
        date: data.get('date'),
        description: data.get('desc')
    }
    if (eventData) {
        let url = `https://auth-inky-alpha.vercel.app/events/new`

        if (method === 'PATCH') {
            const id = params.eventId
            url = `https://auth-inky-alpha.vercel.app/events/${id}/edit`
        }
        const token = getToken()
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(eventData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.status === 422) {
            return await response.json()
        }
        if (!response.ok) throw json({ message: 'could save event.' }, { status: 500 })
        else return redirect(`/events`)
    }
}