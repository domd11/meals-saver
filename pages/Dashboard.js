import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from '../firebaseApp'
import { useRouter } from 'next/router'
import { Image } from 'semantic-ui-react';
import Link from 'next/link';
import { db } from '../firebaseApp';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import NotUser from './NotUser';
const Dashboard = () => {
    
const app = initFirebase()
const auth = getAuth();
const [user, loading] = useAuthState(auth);
const provider = new GoogleAuthProvider(); 
const router = useRouter(); 
const [likedMeals, setLikedMeals] = useState([])


const signIn = async () => {
    const result = await signInWithPopup(auth, provider); 
}



useEffect(() => {
    if (!loading) {
        ;(async () => {

            console.log("page loaded"); 
    
            const docsRef = collection(db, `users/${user.uid}/liked-recipies`); 
            const snapshots = await getDocs(docsRef)
    
            const docs = snapshots.docs.map((doc) => {
                const data = doc.data(); 
    
                data.id = doc.id; 
                return data
            })
    
            setLikedMeals(docs)
    
            console.log(docs)
        })()
    }
}, [loading])

async function deleteLikedItem (meal) {
    await deleteDoc(doc(db, `users/${user.uid}/liked-recipies`, meal.id)); 
    location.reload(false)
}


if (loading) {
    return <h2>Loading..</h2>
}

if (!user) {

    return <NotUser />
  }






  return (
    <div>
    <div className='navbar'>
    <h1>FoodHub</h1>
{  user ?  <Image onClick={() => {router.push("/Account")}} className="nav-item-image" src="data:image/png;base64,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" alt={user.displayName}/> : '' }
    </div>
    <div className='container'>
    {user ? (
        <div>
            <div className='header'>
            <h1 className='heading'>Welcome to FoodHub, {user.displayName}</h1>
            <small className='motto'>Where we give you the food and the drinks</small>
            </div>
            <hr />
            <br />

            <div className='links'>
                <li><Link href="/Foods/Meal/Meals">View Meals</Link></li>
                <li><Link href="/Foods/Meal/Location">View Meals By Location</Link></li>
                <li><Link href="/Foods/Meal/Ingredient">View Meals by Main Ingredient</Link></li>
            </div>


{   likedMeals.length >= 1 ?  <h1>You have {likedMeals.length} { likedMeals.length > 1 ? "recipes..." : "reicpe..."}</h1> : ""}
            

            {likedMeals.length > 0 ? (
                <div className='dashboard-housing'>
                {likedMeals.map((meal) => {
                    return (
                       <div className=' liked' key={meal.idMeal}>
                        <Image className='thumbnail-dashboard' src={meal.imageUrl} />
                        <p className='dashboard-meal link-item' onClick={() => {router.push(`/Foods/Meal/${meal.idMeal}`)}}>{meal.id}</p>
                       
                        <button className='signout' onClick={() => {deleteLikedItem(meal)}}>Delete</button>
                       </div>
                    )
                })}
                </div>
            ) : 
                <h1>You have {likedMeals.length} recipies saved. Go add some! </h1>
        }
        </div>
    ) : (
        <div>
            <h1 className='heading'>You are not a user</h1>
            <button className='signin' onClick={() => signIn()}>Sign in</button>
        </div>
        )}
        </div>
    </div>
  )
}

export default Dashboard    