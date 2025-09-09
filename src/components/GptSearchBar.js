import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from '../utils/langConstants'
import groq from '../utils/groqAI'
import { API_options } from '../utils/constants'
import { addTmdbSearchResults } from '../utils/gptSlice'

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector(store => store.lang.langSelect);
    const searchText = useRef(null);

    //search movie in TMDB
    const groqSuggTmdbMovieSearch = async(movie) => {
      const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_options);
      const json = await data.json();
      return json.results;
    }

    const handleGPTSearchButtonClick = async() => {
      //make an api call to groq api and get results
      const query = 'act as a movie recommendation system and suggest some english movies/TV shows for the query' + searchText.current.value + '. only give me name of 10 movies/TV shows no extra text, comma separated like in the example ahead. Eg- la la land, interstellar, die hard, 7 days in hell. dont give comma separated movies like- crazy, stupid, love.';
      const groqApiResults = await groq.chat.completions.create({
            messages: [
              {
                role: "user",
                content: query,
              },
            ],
            model: "llama3-70b-8192",
      });  
      // The Hangover, Superbad, Bridesmaids, Zombieland, Anchorman
      console.log(groqApiResults.choices[0]?.message?.content);
      // [The Hangover, Superbad, Bridesmaids, Zombieland, Anchorman]
      const groqSuggestedMovies = groqApiResults.choices[0]?.message?.content.split(',');
      const promiseArray = groqSuggestedMovies.map((movie) => groqSuggTmdbMovieSearch(movie));
      // [Promise, Promise,Promise, Promise, Promise]
      const tmdbMovieSearchResults = await Promise.all(promiseArray);
      console.log(tmdbMovieSearchResults);
      dispatch(addTmdbSearchResults({groqResults: groqSuggestedMovies, tmdbResults: tmdbMovieSearchResults}));
    }    

  return (
    <div className='flex md:justify-center pt-42 absolute w-full h-full bg-black bg-opacity-5 flex-row'>
        <div className='relative z-10 flex md:justify-center md:m-[15%] h-[70px] w-[950px] rounded-lg flex-row ml-6'>
          <form 
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              ref={searchText}
              placeholder={lang[langKey].searchBarPlaceholder}
              type='text'
              className='md:h-[50px] md:w-[700px] md:px-4 bg-black bg-opacity-90 md:text-white border border-white md:m-0 mt-[75%] w-[600px] text-[15px] h-10 justify-center px-4'
            />
            <button 
              className='md:w-[200px] md:h-[50px] md:ml-4 text-white md:text-xl font-bold bg-red-600 hover:bg-opacity-80 rounded-sm text-[15px] h-8 w-16 ml-60 mt-8'
              onClick={handleGPTSearchButtonClick}
            >
              {lang[langKey].search}
            </button>
          </form>
        </div>
    </div>
  )
}

export default GptSearchBar
