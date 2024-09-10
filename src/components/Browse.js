import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from "../hooks/usePopularMovies";
import useOnAirTV from "../hooks/useOnAirTV";
import useUpcomingMovies from "../hooks/useUpcoming";
import GptSearch from "./GptSearch";
import Header from "./Header"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularTV from "../hooks/usePopularTV";

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearchView)
  useNowPlayingMovies();
  usePopularMovies();
  useOnAirTV();
  useUpcomingMovies();
  usePopularTV();

  return (
    <div>
      <Header />
      {
        showGptSearch? 
        <GptSearch /> :
        <div className="bg-black w-screen h-screen">
          <MainContainer />
          <SecondaryContainer />
        </div>
      }
      
      
    </div>
  )
}

export default Browse