import React from 'react'
import { BG_Url } from '../utils/constants'

const Hero = () => {
  return (
    <div className='fixed inset-0 overflow-hidden bg-black'>
        <img 
            src={BG_Url} alt="logo" 
        />
    </div>
  )
}

export default Hero