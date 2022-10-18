import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Image } from 'semantic-ui-react'
import Navbar from '../../Navbar'
import Link from 'next/link'
import LikeButton from '../../LikeButton'
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Item = () => {
    const router = useRouter()
    const { id } = router.query
    const [meals, setMeals] = useState([])
    const auth = getAuth();
const [user, loading] = useAuthState(auth);
    
    const fetchData = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => {
            return response.json()
        }).then((data) => {
            setMeals(data.meals); 
        })  
    }

    

    useEffect(() => {
        fetchData()
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
        <div className='about-container'>
            {meals.map((meal) => {
                return (
                    <div key={meal.idMeal}>
                        <div className='image-text'>
                        <Image className='image-about' src={meal.strMealThumb} alt={meal.strMeal}/>
                        <h1 className='title'>{meal.strMeal}</h1>
                        </div>
                        <span className='span'>Type: {meal.strCategory}</span>
                        <br />
                        {meal.strDrinkAlternate !== null ? <div><span className='span'>{meal.strDrinkAlternate}</span><br /></div> : ""}
                        <span className='span'>Area: {meal.strArea}</span>
                        <br />
                        <span className='span'>{meal.strTags}</span>
                        <br />
                        {meal.strYoutube !== null ? (
                      <Link style={{ verticalAlign:'middle', display: 'inline' }} href={meal.strYoutube} target="_top">
                                      <button className='youtube-link'>
                                      <Image style={{ verticalAlign: "middle" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABNUlEQVRIidWVvU4CQRhFz5KAjYkmtlZa2Fnoe8BijI+gj2BrJ+rLwHuoCZ1BqdRY2FEZNR6LhbjC/sy6Ntxkq7lzz8w3s9/AsisqGlRbQDz99oDN6dATcAv0gX4URe+VyeqBOrZcD2q3SnBDvQwInteF2ggBXP0hfKZeSFnqKs4Lb5nUs67GJpcDgHTNYmC7YIOfpfVNtAW08wBF2gBOgNcAyGKWOirad8q3qp6pbwX2uyzAJASQ8u+owxz7ZOYrv7c1lQa8hExQ103u+xDYzbE9ZwGuS4LX1GNgBJwCKwX2xSz1qOgMKuowC9BU7/8h/NePNg/p1gz/UtuZ4SnIXzrpTOeF4VNAw6T1Vl15z5B2nQLFhp3JSO3k5ZQ9mU2gQ9Jb9vl5Mh+BG2AADKIo+ghe+dLpG8fvdSDgFn06AAAAAElFTkSuQmCC" /> 

                                      Youtube Video
                                      </button>
                                      </Link>
                    )
                     : ""}
                     <LikeButton meal={meal}/>
                     <br />
                       
                        <h2>Ingredients: </h2>
                        {meal.strIngredient1 !== ""? <li>{meal.strIngredient1}: {meal.strMeasure1}</li>: ""}
                        {meal.strIngredient2 !== ""? <li>{meal.strIngredient2}- {meal.strMeasure2}</li>: ""}
                        {meal.strIngredient3 !== ""? <li>{meal.strIngredient3}- {meal.strMeasure3}</li>: ""}
                        {meal.strIngredient4 !== ""? <li>{meal.strIngredient4}- {meal.strMeasure4}</li>: ""}
                        {meal.strIngredient5 != ""? <li>{meal.strIngredient5}- {meal.strMeasure5}</li> : ""}
                        {meal.strIngredient6 !== ""? <li>{meal.strIngredient6}- {meal.strMeasure6}</li>: ""}
                        {meal.strIngredient7 !== ""? <li>{meal.strIngredient7}- {meal.strMeasure7}</li>: ""}
                        {meal.strIngredient8 !== ""? <li>{meal.strIngredient8}- {meal.strMeasure8}</li>: ""}
                        {meal.strIngredient9 !== ""? <li>{meal.strIngredient9}- {meal.strMeasure9}</li>: ""}
                        {meal.strIngredient10 !== ""? <li>{meal.strIngredient10}- {meal.strMeasure10}</li>: ""}
                        {meal.strIngredient11 !== ""? <li>{meal.strIngredient11}- {meal.strMeasure11}</li>: ""}
                        {meal.strIngredient12 !== ""?<li>{meal.strIngredient12}- {meal.strMeasure12}</li>: ""}
                        {meal.strIngredient13 !== ""? <li>{meal.strIngredient13}- {meal.strMeasure13}</li>: ""}
                        {meal.strIngredient14 !== ""? <li>{meal.strIngredient14}- {meal.strMeasure14}</li>: ""}
                        {meal.strIngredient15 !== ""? <li>{meal.strIngredient15}- {meal.strMeasure15}</li>: ""}
                        <br />
                        
                        <h2>Instructions</h2>
                        <p>{meal.strInstructions}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Item