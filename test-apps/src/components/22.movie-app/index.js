import { useContext } from "react";
import { MovieContext } from "./context/GlobalState";
import MovieCard from "./components/movie-card";
import "./movie.css";
import MovieWatchList from "./components/movie-watchlist";
import MovieAlreadyWatched from "./components/movie-watched";

function MovieApp() {
    const {
        state,
        setSearchMovieParam,
        tmbi_api_key
    } = useContext(MovieContext);

    const { searchMovieParam, isRequestLoading, movieResults, movieErrors } = state;

    if (!tmbi_api_key)
        return <h2>Please pass the api key value for tmdb to access APIs. For more information: <a href="https://developer.themoviedb.org/reference/intro/my-requests">Click here.</a></h2>;

    return (
        <div className="movie-app">
            <h1>Movie App</h1>
            <div className="watch-list-details-container">
                <MovieWatchList />
                <MovieAlreadyWatched />
            </div>
            <div className="movie-search-container">
                <input
                    type="text"
                    name="searchMovieParam"
                    value={searchMovieParam}
                    onChange={(event) => setSearchMovieParam(event.target.value)}
                    placeholder="Search for a movie..."
                />
            </div>
            {isRequestLoading ? <h1>Fetching list of movies. Please wait!!</h1> : null}
            <div className="movie-search-results-container">
                {movieResults && movieResults.length > 0 && !isRequestLoading
                    ? movieResults.map((movieItem) => (
                        <MovieCard key={movieItem.id} movieItem={movieItem} />
                    )) : null}
                {/* {!isRequestLoading && errors ? <h1>{errors}</h1> : null} */}
            </div>
            <div className="error-container">
                {!isRequestLoading && movieErrors !== '' ? <h1>{movieErrors}</h1> : null}
            </div>
        </div>
    );
}

export default MovieApp;