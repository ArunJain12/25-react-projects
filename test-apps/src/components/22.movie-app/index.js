import { useContext } from "react";
import { MovieContext } from "./context/GlobalState";
import MovieCard from "./components/movie-card";
import "./movie.css";

function MovieApp() {
    const { searchMovieParam,
        setSearchMovieParam,
        movieResults,
        isRequestLoading,
        tmbi_api_key
    } = useContext(MovieContext);

    if (!tmbi_api_key)
        return <h2>Please pass the api key value for tmdb to access APIs. For more information: <a href="https://developer.themoviedb.org/reference/intro/my-requests">Click here.</a></h2>
    return (
        <div className='movie-app'>
            <h1>Movie App</h1>
            <div className="movie-search-container">
                <input
                    type="text"
                    name="searchMovieParam"
                    value={searchMovieParam}
                    onChange={(event) => setSearchMovieParam(event.target.value)}
                    placeholder="Search for a movie..."
                />
            </div>
            {isRequestLoading ? <h1>Fetching list of movies!! Please wait</h1> : null}
            <div className="movie-search-results-container">
                {movieResults && movieResults.length > 0 && !isRequestLoading
                    ? movieResults.map((movieItem) => (
                        <MovieCard key={movieItem.id} movieItem={movieItem} />
                    )) : null}
                {searchMovieParam !== '' && !isRequestLoading && movieResults.length === 0 ? <h1>No movie result found ! Please search something to get results.</h1> : null}
            </div>
        </div>
    );
}

export default MovieApp;