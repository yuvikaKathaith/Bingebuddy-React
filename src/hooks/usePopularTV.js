import { API_options } from '../utils/constants'
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addPopularTV } from '../utils/moviesSlice'

// fetch data from TMDB API and update store
const usePopularTV = () => {
    const dispatch = useDispatch();
    const popularTV = useSelector(store => store.movies.popularTV)
    const getPopularTV = async() => {
        const data = await fetch('https://api.themoviedb.org/3/tv/popular', API_options);
        const json = await data.json();
        dispatch(addPopularTV(json.results));
    }

    useEffect( () => {
        !popularTV && getPopularTV();
    }, []);
}
export default usePopularTV;