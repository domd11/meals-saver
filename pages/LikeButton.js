import React, { useEffect } from 'react'
import { Image } from 'semantic-ui-react'
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from '../firebaseApp'
import { useRouter } from "next/router"
import { db } from '../firebaseApp';


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
    <Image style={{ verticalAlign: 'middle' }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAA2ElEQVQ4jd2RvQ4BQRRGPyIboZJt1Ntu6afxABLeZgtRegUdJQXPoqLxBJSIglKOwmCy2bWzoXKSW8zPPffOHekvAPpA71eyELiZCH8hnPJm8q2sBlws4RXwP+UUU0RlIJA0lFS1jiqSBkAAlLO6CYEVcMCdg8l5zbZkOTuS2hlTiOOb6Ejaxjv0gEWO7p4sAC/t2QVglEM2BhL/IS6OHGRRUm6afZ9ZVdrlEbYchIl30oSN2PpswqbpUPQBcLJmtQTqJpbW/jGPcA6sgW7CWRfYADNn4X9zBzZYXkqhpUINAAAAAElFTkSuQmCC" alt="like"/>
    Save Meal    
    </button>
  )
}

export default LikeButton


