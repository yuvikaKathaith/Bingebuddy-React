import { API_options } from '../utils/constants'
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { addPopularTV } from '../utils/moviesSlice'

// fetch data from TMDB API and update store
const usePopularTV = () => {
    const dispatch = useDispatch();
    const getPopularTV = async() => {
        const data = await fetch('https://api.themoviedb.org/3/tv/popular', API_options);
        const json = await data.json();
        dispatch(addPopularTV(json.results));
    }

    useEffect( () => {
        getPopularTV();
    }, []);
}
export default usePopularTV;