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
import Error from '../../Error';
import NotUser from '../../NotUser';

import { AiFillInfoCircle } from 'react-icons/ai' 
import { AiFillPlayCircle } from 'react-icons/ai'
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



    async function getLikedMeals (meal) {
        const docRef = doc(db, `users/${user.uid}/liked-recipies/`, meal.strMeal );
        const docSnap = await getDoc(docRef); 
        

        const exists = docSnap.exists(); 


        return exists

        

    }

    if (!user) {

        return <NotUser />
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

                    <button  id={`${meal.strMeal}toggle-btn`} className='toggle' onClick={() => {router.push(`/Foods/Meal/${meal.idMeal}`)}}>
                    <AiFillInfoCircle className="icon-styles"/>
                    More Info
                    </button>

                    
                    {meal.strYoutube !== null ? (
                      <Link style={{ verticalAlign:'middle', display: 'inline' }} href={meal.strYoutube}>
                                      <button className='youtube-link'>
                                        <AiFillPlayCircle className="icon-styles" />
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
        <Error />
}
        </div>
    </div>
  )
}

export default Meals


