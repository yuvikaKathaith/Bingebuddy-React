import { API_options } from '../utils/constants'
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addTopRatedMovies } from '../utils/moviesSlice'

// fetch data from TMDB API and update store
const useOnAirTV = () => {
    const dispatch = useDispatch();
    const topRatedMovies = useSelector(store => store.movies.topRatedMovies)
    const getTopRatedMovies = async() => {
        const data = await fetch('https://api.themoviedb.org/3/tv/on_the_air', API_options);
        const json = await data.json();
        dispatch(addTopRatedMovies(json.results));
    }

    useEffect( () => {
        !topRatedMovies &&getTopRatedMovies();
    }, []);
}
export default useOnAirTV;