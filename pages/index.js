import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/react'
import { initFirebase } from '../firebaseApp'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { Image } from 'semantic-ui-react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'; 
import { db } from '../firebaseApp';
export default function Home() {
  const {data: session} = useSession()

  const app = initFirebase()

  const auth = getAuth();
  const provider = new GoogleAuthProvider(); 
  const [user, loading] = useAuthState(auth);
  const router = useRouter(); 

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider); 
    console.log(result.user)

  }

  
  if(loading) {
    return <p>Loading...</p>
  }

  if (user) { 
    const userRef = doc(db, 'users', user.uid); 

    setDoc(userRef, {
      name: user.displayName, 
      email: user.email, 
      phone: user.phoneNumber, 
    })

    

    router.push("/Dashboard")
  }


  return (
    <div>
    <div className='header'>
    <h1 className='heading'>Welcome to FoodHub</h1>
    <small className='motto'>Where we give you the food and the drinks</small>
    <br />
    <div className='signin' onClick={signIn}>
    <Image className='google-icon' style={{ hieght: '100px' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAADNUlEQVRIid2VWUiUURTH//fbJs3UcTIzs0XTSqOFMpOSIIUoksgeCopJWp4qKaqHjCQwKuullSKp0GghEAm0BUxEi1YpG0NzKbOgTB01s3Hmft+9PcSM883ojOSb/6e7nt855957LjBWRPwt4EfkZehkOfjNktGHEKiQYADFeNILI6lGqHCa5NHX/wXhR5VEfFOL0cJmg/uwIAKYJdRhspxJjtubRgzhB8VdqGNX0M8FXx7qFExULBC2kRPabc8pyQtwSNyJGu0q6IjN/5MIDi60AJrXlC4SfkxJwAtq8YpABBAjfMQ4PEMAmsAxFT1IQyubAwrASCgSpVRykr4ciq+PxKoVeQEiSRemS+nkDH3nuZkfVObBqhYjQjQPB9BFwp8GTIODtaBclfBUAziAKNIJmc8gN9E/nIGRaNBrxjIhQsJqCciSgTDCECmtGS0AcE8XR7qrHSsAe5UbJN3+xnPD4YtH89psUzf6MkrA+ERDd83Z7ByzHgJE61bKvGIoA10OY2pFR8pcf97Hjv8SA8AMuKcLMHn40+nPkC/1qUGys+0O6dIv4+GjgQRJf1wvzf1M2kAw39lt1EIygI5bnptNSnf1qvDnkzzHP/yKi2+3TxSd/TC5u9fZHrzClYZsEJxjILhri0XxQAyWKz9TDqx9+cKf1ycK9qdead5aRbkrQ1g3paKkYN++TMA9XUQo6eUKze1Lwh1bHBxcxFctsDT//vIJvgAXC82mqo7k++4AiWiIln+cdPZdELLS9vVS/7z6Wjp4/s1qiOk7MbReKFu6ZCjAvUeJSxts0yy1PQlG9/Fk49uG3N2nXOVfV1aiFfvmetVh6WGKK7fNWnBYqxb0Ord0RWM4GaiQiPrZAXGGlQWk3bMZ4wcm1yFdM6D8y3oAQLhi1eJC23TvyKvUX36waPsTR9S1Ae5VoH0qwjoT1S2b+Iaosqz83XlFPiEAcP7BEvMrOum6e0T+ZCJ2LYnZduzJrCz0nBv2Z7zxePGcTzSw+D0NS9B8/NISGBbKVksc/71xS8a7kf+MOtjDhUntLCDHygwpVq6E2pkkBQqUhhDaEyH+qTaJtvys1ZYaf3bGhv4C2CwrudPtzEAAAAAASUVORK5CYII=" alt="google-icons" />
    <span className='text'>Sign In</span>
    </div>
    </div>
    </div>
  )
}
