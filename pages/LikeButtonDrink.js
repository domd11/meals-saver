import React, { useEffect } from 'react'
import { Image } from 'semantic-ui-react'
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from '../firebaseApp'
import { useRouter } from "next/router"
import { db } from '../firebaseApp';

import { AiTwotoneStar } from 'react-icons/ai'

const LikeButton = ({ drink }) => {
  const app = initFirebase()

  const auth = getAuth();
  const provider = new GoogleAuthProvider(); 
  const [user, loading] = useAuthState(auth);
  const router = useRouter(); 
  const drinksId = []; 

  const likeRecipie = (drink) => {
    setDoc(doc(db, `users/${user.uid}/liked-drinks`, drink.strDrink), {
      idDrink: drink.idDrink, 
      alcoholic: drink.strAlcoholic, 
      category: drink.strCategory,
      imageUrl: drink.strDrinkThumb,
      tags: drink.strTags, 
    })

  }

  

  





  return (
    <button className='save-btn' onClick={() => {likeRecipie(drink)}}>
    <AiTwotoneStar  className="icon-styles" />
    Save Drink    
    </button>
  )
}

export default LikeButton


