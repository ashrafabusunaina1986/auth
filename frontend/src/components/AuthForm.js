
import classes from './AuthForm.module.css'
import { Form, Link, useSearchParams, useActionData ,useNavigation} from 'react-router-dom'

function AuthForm() {
    const data = useActionData()
    const navigation=useNavigation()
    const isSubmitting=navigation.state==='submitting'

    const [searchParams] = useSearchParams()
    const isLogin = searchParams.get('mode') === 'login'
    return (
        <Form method='post' className={classes.form}>
            <h1>{isLogin ? 'LOGIN' : 'CREATE NEW USER'}</h1>
            {
                data && data.errors &&
                <ul>
                    {
                        Object.values(data.errors).map((err, ind) => {
                            return <li key={ind}>
                                {err}
                            </li>
                        })
                    }
                </ul>
            }
            {data && data.message && <p>{data.message}</p> }
            <p>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' id='email' required />
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' required />
            </p>
            <div className={classes.actions} >

                <Link to={`?mode=${!isLogin ? 'login' : 'signup'}`}>
                    {!isLogin ? 'Login' : 'Create new user'}
                </Link>
                <button disabled={isSubmitting}>{isSubmitting?'submitting...':'Save'}</button>
            </div>
        </Form>
    )
}

export default AuthForm