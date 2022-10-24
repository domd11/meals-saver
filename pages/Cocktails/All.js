import React, { useEffect, useState } from 'react'
import { Image } from 'semantic-ui-react';
import LikeButton from '../LikeButtonDrink';
import Navbar from '../NavbarDrink';
import Error from '../Error';

import { CgDanger } from 'react-icons/cg'
import { AiFillCheckCircle } from 'react-icons/ai';
const All = () => {
    const [cocktails, setCocktails] = useState([]); 
    const [search, setSearch] = useState("")

    const fetchData = () => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`).then((response) => {
            return response.json(); 
        }).then((data) => {
            setCocktails(data.drinks); 
        })
    }


    useEffect(() => {
        fetchData(); 
    }, [])


  return (
    <div>
    <Navbar />

    <div className='container' style={{ textAlign: 'center' }}>
        <h1>Cocktails</h1>

        <input className='search-input' value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder='Search food by name...'/>
    <button className='search-btn' onClick={fetchData}>Search</button>

        <br />
        <br />

        {cocktails !== null ? (
            <div>
            {cocktails.map((cocktail) => {
                return (
                    <div className='card' key={cocktail.idDrink}>
                        <Image className='thumbnail' src={cocktail.strDrinkThumb} />
                        <h2>{cocktail.strDrink}</h2>
                        <span className={cocktail.strAlcoholic === "Alcoholic" ? "alcoholic" : "clean"}>
                        {cocktail.strAlcoholic !== "Alcoholic" ? <AiFillCheckCircle className="icon-styles" /> : <CgDanger className='icon-styles'/>}
                        {cocktail.strAlcoholic}
                        </span>
                        <br />
                        <br />
                        <LikeButton drink={cocktail} />
                    </div>
                )
            })}
            </div>
        ) : (<Error />) }
    </div>

    </div>
  )
}

export default All