import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Navbar = () => {
    const router = useRouter(); 


  return (
    <div className='navbar'>
    <h1 onClick={() => {router.push("/Dashboard")}}>FoodHub</h1>
    <li className='nav-item'><Link href="/Foods/Meal/Meals">Meals</Link></li>
    <li className='nav-item'><Link href="/Foods/Meal/Location">Meals by Location</Link></li>
    <li className='nav-item'><Link href="/Foods/Meal/Ingredient">Meals by Ingredient</Link></li>
    </div> 
  )
}

export default Navbar