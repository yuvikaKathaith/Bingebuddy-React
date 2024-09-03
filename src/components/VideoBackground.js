import useTrailerVideo from "../hooks/useTrailerVideo"
import { useSelector } from 'react-redux';

const VideoBackground = ({movieId}) => {
  useTrailerVideo({movieId});
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);
  return (
    <div>
      <iframe 
      className="w-screen aspect-video"
      src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&loop=1&playlist=${trailerVideo?.key}`}
        title="YouTube video player"  
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      >
      </iframe>
    </div>
  )
}

export default VideoBackground
