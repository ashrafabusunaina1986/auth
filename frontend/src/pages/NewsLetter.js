import React from 'react'
import PageContent from './../components/PageContent'
import NewslettersSignup from '../components/NewslettersSignup'
import { json, redirect } from 'react-router-dom'

function NewsLetterPage() {
    return <PageContent title='Join our awesome newsletter'>
        <NewslettersSignup />
    </PageContent>
}

export default NewsLetterPage

export async function action({ request }) {
    const data = await request.formData()
    const email =  data.get('email')

    return  {message:'signup successfull!'}
}