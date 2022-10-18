import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
const Login = () => {
const {data: session} = useSession()

if(session) {
    return (
        <div>
            <p>{session.user.email}</p>
        </div>
    ) 
} else if (!session) {
    return (
        <div>You are not signed in <button onClick={() => {signIn()}}>Sign in</button></div>
    )
}
}

export default Login