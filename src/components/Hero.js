import React from 'react'
import { BG_Url } from '../utils/constants'

const Hero = () => {
  return (
    <div className='fixed inset-0 overflow-hidden bg-black z-0'>
        <img 
            src={BG_Url} alt="logo"
            className='object-cover w-full h-full opacity-60' 
        />
    </div>
  )
}

export default Hero