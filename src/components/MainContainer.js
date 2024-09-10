import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'
import { useSelector } from 'react-redux'

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if(!movies) return; 
    const mainMovie = movies[0];

    const { title, overview, id } = mainMovie;
    return (
        <div className='md:pt-0 pt-[30%] bg-black md:m-0 mb-28'>
          <VideoTitle title={title} overview={overview}/>
          <VideoBackground movieId={id}/>
        </div>
    )
}

export default MainContainer