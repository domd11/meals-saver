import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Navbar = () => {
    const router = useRouter(); 


  return (
    <div className='navbar'>
    <h1 onClick={() => {router.push("/Dashboard")}}>FoodHub</h1>
    <li className='nav-item'><Link href="/Cocktails/All">All Cocktails</Link></li>
    <li className='nav-item'><Link href="/Cocktails/Ingredient">Cocktails by Ingredient</Link></li>
    </div> 
  )
}

export default Navbar