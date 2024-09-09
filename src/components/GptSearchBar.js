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
      console.log(json.results);
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
            model: "llama3-8b-8192",
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
    <div className='flex justify-center pt-42 absolute w-full h-full bg-black bg-opacity-5 flex-row'>
        <div className='relative z-10 flex justify-center m-[15%] h-[70px] w-[950px] rounded-lg'>
          <form 
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              ref={searchText}
              placeholder={lang[langKey].searchBarPlaceholder}
              type='text'
              className='h-[50px] w-[700px] px-4 bg-black bg-opacity-90 text-white border border-white'
            />
            <button
              className='w-[200px] h-[50px] ml-4 text-white text-xl font-bold bg-red-600 hover:bg-opacity-80 rounded-sm'
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