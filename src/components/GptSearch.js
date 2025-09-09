import GptMovieSuggestions from './GptMovieSuggestions'
import GptSearchBar from './GptSearchBar'
import Hero from './Hero'

const GptSearch = () => {
  return (
    <div className="max-w-screen">
        <Hero />
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch
