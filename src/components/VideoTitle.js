import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const VideoTitle = ( {title, overview} ) => {
  return (
    <div className='absolute aspect-video text-white bg-gradient-to-r from-black w-screen'>
        <div className='pt-[15%] pl-12'>
            <h1 className='font-bold text-6xl'>{title}</h1>
            <p className='font-semibold pt-4 w-1/4'>{overview}</p>
        </div>
        <div className='pl-12 mt-3'>
            <button className='bg-slate-200 font-bold text-black w-[130px] h-[40px] rounded-md text-lg hover:bg-opacity-60'>  
              <FontAwesomeIcon 
                className='pr-2'
                icon={faPlay} 
              /> 
              Play</button>
            <button className='ml-2 bg-gray-500 font-bold text-white bg-opacity-50 w-[150px] h-[40px] rounded-md text-lg hover:bg-opacity-80'>
            <FontAwesomeIcon 
                className='pr-2'
                icon={faCircleInfo} 
              /> 
              More Info</button>
        </div>    
    </div>
  )
}

export default VideoTitle