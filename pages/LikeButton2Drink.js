import React from 'react'
import { Image } from 'semantic-ui-react'
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from '../firebaseApp'
import { useRouter } from "next/router"
import { db } from '../firebaseApp';

import { AiTwotoneStar } from 'react-icons/ai'


const LikeButton2 = ({ drink }) => {
  const app = initFirebase()

  const auth = getAuth();
  const provider = new GoogleAuthProvider(); 
  const [user, loading] = useAuthState(auth);
  const router = useRouter(); 

  const likeRecipie = (drink) => {
    setDoc(doc(db, `users/${user.uid}/liked-drinks`, drink.strDrink), {
      id: drink.idDrink, 
      imageUrl: drink.strDrinkThumb, 
    })
  }

  return (
    <button className='save-btn' onClick={() => {likeRecipie(drink)}}>
    <AiTwotoneStar className="icon-styles" />
    Save Meal    
    </button>
  )
}

export default LikeButton2


