import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from '../firebaseApp'
import { useRouter } from 'next/router'
import { Image } from 'semantic-ui-react';
import Navbar from './Navbar';
import { db } from '../firebaseApp';
import { collection, getDocs } from 'firebase/firestore';
import NotUser from './NotUser';

import { HiChevronLeft } from "react-icons/hi";
import BackButton from './BackButton';
const Account = () => {
    
const app = initFirebase()
const auth = getAuth();
const [user, loading] = useAuthState(auth);
const provider = new GoogleAuthProvider(); 
const router = useRouter(); 

const [likedMeals, setLikedMeals] = useState([]); 

if (loading) {
    console.log("Loading...")
}

if (user) {
    console.log(`hello, ${user.displayName}`); 
}

const logOut = () => {
    auth.signOut();
    router.push("/")
}

if (!user) {

    return <NotUser />
  }





if (loading) {
    return <h2>Loading..</h2>
}

  return (
    <div style={{ marginLeft: '10px', marginRight: '10px' }} className='container'>
     <BackButton />
    {!loading && user ? (
        <div>
            <h1>{user.displayName}</h1>
            <button className='signout'  onClick={() => {
                auth.signOut(); 
                router.push("/")
            }}>Logout</button>

           


            {!loading ? (
                likedMeals.map((meal) => {
                    return (
                        <div key={Math.random()}>
                            <p onClick={() => {router.push(`/Foods/Meal/${meal.idMeal}`)}}>{meal.id}</p>
                        </div>
                    )
                })
            ) : <p>Loading...</p>}
            
        </div>
        
        
        ) : "" }
    </div>
  )
}

export default Account