import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  return (
    movies && (
      <div className='bg-black text-white'>
          <div className='-mt-32'>
            <MovieList title={"Now Playing Movies"} movies={movies.nowPlayingMovies} />
            <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
            <MovieList title={"On Air TV Shows"} movies={movies.topRatedMovies} />
            <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
            <MovieList title={"Popular TV Shows"} movies={movies.popularTV} />

          </div>
      </div>
    )
  )
}

export default SecondaryContainer