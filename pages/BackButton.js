import { useRouter } from 'next/router'
import React from 'react'
import { HiChevronLeft } from 'react-icons/hi'
const BackButton = () => {
    const router = useRouter(); 


  return (
    <button className='image-text back' onClick={() => {router.push("/Dashboard")}}>
    <HiChevronLeft className='door' />
    Go to Dashboard
    </button>
  )
}

export default BackButton