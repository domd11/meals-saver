import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Image } from 'semantic-ui-react';
import Navbar from '../../NavbarDrink';
import { AiFillCheckCircle } from 'react-icons/ai';
import { CgDanger } from 'react-icons/cg';
import LikeButton2 from '../../LikeButton2Drink';
import LikeButton from '../../LikeButtonDrink';
const ById = () => {
    const router = useRouter(); 
    const { id } = router.query


    const [data, setData] = useState([]); 

    const fetchData = () => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) => {
            return response.json(); 
        }).then((data) => {
            setData(data.drinks); 
        })
    }

    useEffect(() => {
        fetchData();

    }, [])

  return (
    <div>
    <Navbar />

    <div className='container'>
        {data.map((x) => {
            return (
                <div key={Math.random()}>
                <Image className='thumbnail' src={x.strDrinkThumb} />
                    <h1>{x.strDrink}</h1>

                    <LikeButton drink={x}/>

                    <p>{x.strCategory}</p>
                    <span className={x.strAlcoholic === "Alcoholic" ? "alcoholic" : "clean"}>
                    {x.strAlcoholic !== "Alcoholic" ? <AiFillCheckCircle className="icon-styles" /> : <CgDanger className='icon-styles'/>}
                    {x.strAlcoholic}
                    </span>

                    <br />

                    {x.strVideo !== null ? <p>{x.strVideo}</p> : ""}

                    <br />

                        {x.strIngredient1 !== null ? <li>{x.strIngredient1}: {x.strMeasure1}</li>: ""}
                        {x.strIngredient2 !== null ? <li>{x.strIngredient2}: {x.strMeasure2}</li>: ""}
                        {x.strIngredient3 !== null ? <li>{x.strIngredient3}: {x.strMeasure3}</li>: ""}
                        {x.strIngredient4 !== null ? <li>{x.strIngredient4}: {x.strMeasure4}</li>: ""}
                        {x.strIngredient5 !== null ? <li>{x.strIngredient5}: {x.strMeasure5}</li> : ""}
                        {x.strIngredient6 !== null ? <li>{x.strIngredient6}: {x.strMeasure6}</li>: ""}
                        {x.strIngredient7 !== null ? <li>{x.strIngredient7}: {x.strMeasure7}</li>: ""}
                        {x.strIngredient8 !== null ? <li>{x.strIngredient8}: {x.strMeasure8}</li>: ""}
                        {x.strIngredient9 !== null ? <li>{x.strIngredient9}: {x.strMeasure9}</li>: ""}
                        {x.strIngredient10 !== null ? <li>{x.strIngredient10}: {x.strMeasure10}</li>: ""}
                        {x.strIngredient11 !== null? <li>{x.strIngredient11}: {x.strMeasure11}</li>: ""}
                        {x.strIngredient12 !== null ?<li>{x.strIngredient12}: {x.strMeasure12}</li>: ""}
                        {x.strIngredient13 !== null ? <li>{x.strIngredient13}: {x.strMeasure13}</li>: ""}
                        {x.strIngredient14 !== null ? <li>{x.strIngredient14}: {x.strMeasure14}</li>: ""}
                        {x.strIngredient15 !== null ? <li>{x.strIngredient15}: {x.strMeasure15}</li>: ""}

                    <p>{x.strInstructions}</p>
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default ById