import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestions = () => {
    const { groqApiSuggestions, tmdbSearchResults } = useSelector(store => store.gpt);
    if(!groqApiSuggestions) return null;
    return (
        
        <div className='text-white bg-black pt-[30%]'>
            <div>
                {groqApiSuggestions?.map((movieName, index) => <MovieList key={movieName} title={movieName} movies={tmdbSearchResults[index]} />)} 
            </div>
        </div>
    )
}

export default GptMovieSuggestions
