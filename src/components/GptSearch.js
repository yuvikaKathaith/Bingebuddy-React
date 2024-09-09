import GptMovieSuggestions from './GptMovieSuggestions'
import GptSearchBar from './GptSearchBar'
import Hero from './Hero'

const GptSearch = () => {
  return (
    <div>
        <Hero />
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch