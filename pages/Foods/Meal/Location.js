import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Image } from 'semantic-ui-react';
import LikeButton from '../../LikeButton';
import Navbar from '../../Navbar';
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import SecondLikeButton from '../../SecondLikeButton';
import { doc, getDoc,  } from 'firebase/firestore';
import { db } from '../../../firebaseApp';

const Location = () => {
    const [meals, setMeals] = useState([]); 
    const [search, setSearch] = useState("Canadian")
    const router = useRouter(); 
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const fetchData = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${search}`).then((response) => {
            return  response.json(); 
        }).then((data) => {
            setMeals(data.meals)
        })
    }

  

    useEffect(() => {
        fetchData(); 
    }, []); 

    

    async function getLikedMeals (meal) {
        const docRef = doc(db, `users/${user.uid}/liked-recipies/`, meal.strMeal );
        const docSnap = await getDoc(docRef); 

        var likeBtn = document.getElementById(`${meal.idMeal}-Like`);
        var dislikeBtn = document.getElementById(`${meal.idMeal}-DisLike`);


        if(docSnap.exists()) {
            likeBtn.style.display = "none"; 
            dislikeBtn.style.display = "inline-block"
        }

    }

    



    if (!user) {
        router.push("/")
        return <h1>You are not a user. you cannot be here</h1>
      }
    
  return (
    <div>
    <Navbar />
    <div className='container'>
    <input className='search-input' value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder='Search food by location...'/>
    <button className='search-btn' onClick={fetchData}>Search</button>
    <br />
    <br />
    <hr />

        {meals ? 
            (
                meals.map((meal) => {
            return (
                <div key={meal.idMeal}>
                <Image className='thumbnail' src={meal.strMealThumb} alt={meal.strMeal}/>
                <p className='meal-name' onClick={() => {router.push(`/Foods/Meal/${meal.idMeal}`)}}>{meal.strMeal}</p>
                <SecondLikeButton id={`${meal.idMeal}-Like`} meal={meal}/>
                </div>
            )
        })
        )
        : 
        <div className='error'>
        No data available
        </div>
    }
    </div>
    </div>
  )
}

export default Location