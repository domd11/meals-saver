import React, { useState, useEffect } from 'react'
import { Image, ImageGroup } from 'semantic-ui-react' 
import Link from 'next/link'
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import Navbar from '../../Navbar';
import { useRouter } from 'next/router';
import LikeButton from '../../LikeButton';
import { doc, setDoc, collection, getDocs, getDoc } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db } from '../../../firebaseApp';
const Meals = () => {
    const [meals, setMeals] = useState([]); 
    const [search, setSearch] = useState("")
    const [showModal, setShowModal] = useState(false);
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [likedMeals, setLikedMeals] = useState([])
    const [foundMeals, setFoundMeals] = useState([])




    const mealsId = []; 


   

    const router = useRouter(); 

 

    



    

    const fetchData = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`).then((response) => {
            return response.json(); 
        }).then((data) => {
            setMeals(data.meals); 
        })
    }

    useEffect(() => {
        fetchData(); 


        if (!loading) {
            ;(async () => {
    
                console.log("page loaded"); 
        
                const docsRef = collection(db, `users/${user.uid}/liked-recipies`); 
                const snapshots = await getDocs(docsRef)
        
                const docs = snapshots.docs.map((doc) => {
                    const data = doc.data(); 
    
    
        
                    data.id = doc.id; 
    
    
                    mealsId.push(data.id)
                    
    
                    return data
    
                })

                
        

                setLikedMeals(docs)


    
               
    
                
    
                
        
            })()
    
        }
    }, []); 

    if (!user) {
      return <h1>You are not a user. you cannot be here</h1>
    }

    async function getLikedMeals (meal) {
        const docRef = doc(db, `users/${user.uid}/liked-recipies/`, meal.strMeal );
        const docSnap = await getDoc(docRef); 
        

        const exists = docSnap.exists(); 


        return exists

        

    }

    
    

  return (
    <div>
    <div>

    <Navbar />
    
    
    </div>
    <div className='container'>
    <input className='search-input' value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder='Search food by name...'/>
    <button className='search-btn' onClick={fetchData}>Search</button>
    <br />
    <br />
    <hr />

    {meals !== null ? 
        (
            <div>
            {meals.map((meal) => {
               getLikedMeals(meal); 
                

            return (
                <div key={meal.idMeal}>
                
                    <Image className="thumbnail" src={meal.strMealThumb} alt={meal.strMeal} />
                    <h2>{meal.strMeal}</h2>
                    <strong>{meal.strTags}</strong>
                    <li>{meal.strCategory}</li>
                    <li>{meal.strArea}</li>

                    <button  id={`${meal.strMeal}toggle-btn`} className='toggle' onClick={() => {router.push(`/Foods/Meal/${meal.idMeal}`)}}>More Info</button>

                    <button onClick={() => {getLikedMeals(meal)}}>Test 123</button>
                    
                    {meal.strYoutube !== null ? (
                      <Link style={{ verticalAlign:'middle', display: 'inline' }} href={meal.strYoutube}>
                                      <button className='youtube-link'>
                                      <Image style={{ verticalAlign: "middle" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABNUlEQVRIidWVvU4CQRhFz5KAjYkmtlZa2Fnoe8BijI+gj2BrJ+rLwHuoCZ1BqdRY2FEZNR6LhbjC/sy6Ntxkq7lzz8w3s9/AsisqGlRbQDz99oDN6dATcAv0gX4URe+VyeqBOrZcD2q3SnBDvQwInteF2ggBXP0hfKZeSFnqKs4Lb5nUs67GJpcDgHTNYmC7YIOfpfVNtAW08wBF2gBOgNcAyGKWOirad8q3qp6pbwX2uyzAJASQ8u+owxz7ZOYrv7c1lQa8hExQ103u+xDYzbE9ZwGuS4LX1GNgBJwCKwX2xSz1qOgMKuowC9BU7/8h/NePNg/p1gz/UtuZ4SnIXzrpTOeF4VNAw6T1Vl15z5B2nQLFhp3JSO3k5ZQ9mU2gQ9Jb9vl5Mh+BG2AADKIo+ghe+dLpG8fvdSDgFn06AAAAAElFTkSuQmCC" /> 

                                      Youtube Video
                                      </button>
                                      </Link>
                    )
                     : ""}



                     <LikeButton meal={meal}/>


                      
                     
                    
                    
                     
                    
                   
                    
                </div>
            )
        })}

        
        </div>
    ) : 
        <div className='error'>
        No data available
        </div>
}
        </div>
    </div>
  )
}

export default Meals


