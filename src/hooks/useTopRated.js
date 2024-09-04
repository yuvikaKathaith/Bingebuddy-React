import { API_options } from '../utils/constants'
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { addTopRatedMovies } from '../utils/moviesSlice'

// fetch data from TMDB API and update store
const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const getTopRatedMovies = async() => {
        const data = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200', API_options);
        const json = await data.json();
        console.log(json.results);
        dispatch(addTopRatedMovies(json.results));
    }

    useEffect( () => {
        getTopRatedMovies();
    }, []);
}
export default useTopRatedMovies;