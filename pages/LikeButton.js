import React, { useEffect } from 'react'
import { Image } from 'semantic-ui-react'
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from '../firebaseApp'
import { useRouter } from "next/router"
import { db } from '../firebaseApp';

import { AiTwotoneStar } from 'react-icons/ai'


const LikeButton = ({ meal }) => {
  const app = initFirebase()

  const auth = getAuth();
  const provider = new GoogleAuthProvider(); 
  const [user, loading] = useAuthState(auth);
  const router = useRouter(); 
  const mealsId = []; 

  const likeRecipie = (meal) => {
    setDoc(doc(db, `users/${user.uid}/liked-recipies`, meal.strMeal), {
      idMeal: meal.idMeal, 
      area: meal.strArea, 
      category: meal.strCategory,
      imageUrl: meal.strMealThumb,
    })

  }

  

  





  return (
    <button className='save-btn' onClick={() => {likeRecipie(meal)}}>
    <AiTwotoneStar  className="icon-styles" />
    Save Meal    
    </button>
  )
}

export default LikeButton


