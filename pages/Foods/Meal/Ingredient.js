import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Image } from 'semantic-ui-react';
import Navbar from '../../Navbar'
import SecondLikeButton from '../../SecondLikeButton';
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Indregient = () => {
  const [meals, setMeals] = useState([]); 
  const [search, setSearch] = useState("chicken breast")
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter(); 

  const fetchData = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`).then((response) => {
    return response.json(); 
  }).then((data) => {
    setMeals(data.meals) 
  })
  }



  useEffect(() => {
    fetchData(); 
  }, [])

  if (!user) {
    return <h1>You are not a user. you cannot be here</h1>
  }

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

  






  return (
    <div>
    
    <Navbar />
    
    


    <div className='container'>
    <input value={search} onChange={(e) => setSearch(e.target.value)}/>
    <button className='search-btn' onClick={fetchData}>Search</button>
    <hr />
      {meals !== null ? meals.map((meal) => {
        return (
          <div key={meal.idMeal}>
          <Image className='thumbnail' src={meal.strMealThumb} />
          <p className='meal-name' onClick={() => {router.push(`/Foods/Meal/${meal.idMeal}`)}}>{meal.strMeal}</p>
          
          <SecondLikeButton meal={meal}/>
          </div>
          )
      }) : <p>No data available</p>}
    </div></div>
  )
}

export default Indregient 