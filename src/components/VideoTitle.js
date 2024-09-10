import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const VideoTitle = ( {title, overview} ) => {
  return (
    <div className='absolute aspect-video text-white bg-gradient-to-r from-black w-screen'>
        <div className='pt-[15%] pl-12'>
            <h1 className='font-bold text-4xl md:text-6xl md:w-1/4 md:mt-2 mt-24'>{title}</h1>
            <p className='font-semibold pt-4 w-1/4 hidden md:inline-block'>{overview}</p>
        </div>
        <div className='pl-12 mt-3'>
            <button className='bg-slate-200 font-bold text-black md:w-[130px] md:h-[40px] rounded-md md:text-lg hover:bg-opacity-60 w-24 h-6 text-[14px]'>  
              <FontAwesomeIcon 
                className='pr-2'
                icon={faPlay} 
              /> 
              Play</button>
            <button className='ml-2 bg-gray-500 font-bold text-white bg-opacity-50 md:w-[150px] md:h-[40px] rounded-md md:text-lg hover:bg-opacity-80 w-32 h-6 text-[14px]'>
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