import React, { useContext } from "react";
import { MovieContext } from "../context/GlobalState";

function MovieCard({ movieItem }) {
    const { state, addMovieToWatchList, moveToWatched } = useContext(MovieContext);
    const { watchList, watched } = state;

    return (
        <div className="movie-card" key={movieItem.id}>
            <div className="img">
                {movieItem?.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w200${movieItem.poster_path}`}
                    />
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
                    disabled={
                        (watchList.findIndex(currentMovie => currentMovie.id === movieItem.id) > -1) ||
                        (watched.findIndex(currentMovie => currentMovie.id === movieItem.id) > - 1)
                    }
                    onClick={() => addMovieToWatchList(movieItem)}
                >
                    Add To Watchlist
                </button>
                <button
                    disabled={watched.findIndex(item => item.id === movieItem.id) > -1}
                    onClick={() => moveToWatched(movieItem)}
                >
                    Add To Watched
                </button>
            </div>
        </div>
    );
}

export default MovieCard;