
function MovieCard({ movieItem }) {
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
                <button>
                    Add To Watchlist
                </button>
                <button>
                    Add To Watched
                </button>
            </div>
        </div>
    );
}

export default MovieCard;