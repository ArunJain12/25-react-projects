import React, { useContext } from "react";
import { MovieContext } from "../context/GlobalState";

function MovieWatchList() {
    const { state, removeMovieFromWatchList, moveToWatched } = useContext(MovieContext);
    const { watchList } = state;
 
    return (
        <div className="movie-watchlist">
            <h1>Watch List</h1>
            <div className="movie-watch-list-wrapper">
                {watchList && watchList.length > 0 ? (
                    watchList.map((movieItem) => (
                        <div className="movie-card" key={movieItem.id}>
                            <div className="img">
                                {movieItem?.poster_path ? (
                                    <img src={`https://image.tmdb.org/t/p/w200${movieItem.poster_path}`} />
                                ) : (
                                    <div className="fill-img">No Image Found</div>
                                )}
                            </div>
                            <div className="movie-info">
                                <h3>{movieItem?.title}</h3>
                                <h4>{movieItem?.release_date}</h4>
                                <h4>Original Title: {movieItem?.original_title}</h4>
                            </div>
                            <div className="buttons-wrapper">
                                <button
                                    onClick={() => removeMovieFromWatchList(movieItem.id)}    
                                >
                                    Remove From Watchlist
                                </button>
                                <button
                                    onClick={() => moveToWatched(movieItem)}
                                >
                                    Move to Watched
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="movie-not-found">No movie added in watchlist! Please add one</h1>
                )}
            </div>
        </div>
    );
}

export default MovieWatchList;