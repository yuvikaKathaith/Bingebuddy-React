import React from 'react'
import { useSelector } from 'react-redux'
import lang from '../utils/langConstants'

const GptSearchBar = () => {
    const langKey = useSelector(store => store.lang.langSelect)
  return (
    <div className='flex justify-center pt-42 absolute w-full h-full bg-black bg-opacity-60 flex-row'>
        <div className='relative z-10 flex justify-center m-[15%] h-[70px] w-[950px] rounded-lg'>
          <input 
            placeholder={lang[langKey].searchBarText}   
            type='text'
            className='h-[50px] w-[700px] px-4 mt-2.5 bg-black bg-opacity-90 text-white border border-white'
          />
          <button
            className='w-[200px] h-[50px] ml-4 text-white text-xl mt-2.5 font-bold bg-red-600 hover:bg-opacity-80 rounded-sm'
          >
            {lang[langKey].search}
          </button>
        </div>
    </div>
  )
}

export default GptSearchBar
