import React, { useEffect, useState } from 'react'
import { Image } from 'semantic-ui-react';
import LikeButton2 from '../LikeButton2Drink';
import Navbar from '../NavbarDrink'

const Ingredient = () => {
    const [cocktails, setCocktails] = useState([]); 

    const fetchData = () => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin`).then((response) => {
            return response.json();
        }).then((data) => {
            setCocktails(data.drinks); 
        })
    }

    useEffect(() => {
        fetchData(); 
    }, []); 


  return (
    <div>
        <Navbar />


        <div className='container'>
        <h1>Cocktails by Ingredient</h1>

        <div>
            {cocktails.map((cocktail) => {
                return (
                    <div className='card' key={cocktail.idDrink}>
                        <Image className='thumbnail' src={cocktail.strDrinkThumb} />
                        <p>{cocktail.strDrink}</p>
                        <LikeButton2 drink={cocktail}/>
                    </div>
                )
            })}
        </div>

        </div>
    </div>
  )
}

export default Ingredient