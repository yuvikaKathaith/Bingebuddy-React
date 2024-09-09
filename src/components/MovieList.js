import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    if(!movies) return null;
    return (
        <div className='pl-12 relative pb-12 z-10'>
            <h1 className='text-2xl pb-4'>{title}</h1>
            <div className='flex overflow-x-scroll scrollbar-hide'>
                <div className='flex'>
                    {movies?.map((movie) => <MovieCard key={movie.id} posterPath={movie.poster_path} />)}
                </div>
            </div> 
        </div>
    )
}

export default MovieList