export const SET_MOVIE_SEARCH_PARAM = 'SET_MOVIE_SEARCH_PARAM';
export const SET_IS_REQUEST_LOADING = 'SET_IS_REQUEST_LOADING';
export const SET_MOVIES = 'SET_MOVIES';
export const SET_ERRORS = 'SET_ERRORS';
export const ADD_MOVIE_TO_WATCHLIST = 'ADD_MOVIE_TO_WATCHLIST';
export const ADD_MOVIE_TO_WATCHED = 'ADD_MOVIE_TO_WATCHED';
export const REMOVE_MOVIE_FROM_WATCHLIST = 'REMOVE_MOVIE_FROM_WATCHLIST';
export const REMOVE_MOVIE_FROM_WATCHED = 'REMOVE_MOVIE_FROM_WATCHED';
export const MOVE_TO_WATCHED = 'MOVE_TO_WATCHED';

export function setSearchMovieParam(paylod, dispatch) {
    dispatch({
        type: SET_MOVIE_SEARCH_PARAM,
        paylod
    });
}

export function setIsRequestLoading(paylod, dispatch) {
    dispatch({
        type: SET_IS_REQUEST_LOADING,
        paylod
    });
}

export function setMovies(paylod, dispatch) {
    dispatch({
        type: SET_MOVIES,
        paylod
    });
}

export function setErrors(error, dispatch) {
    dispatch({
        type: SET_ERRORS,
        paylod: error
    });
}

export function addMovieToWatchList(paylod, dispatch) {
    dispatch({
        type: ADD_MOVIE_TO_WATCHLIST,
        paylod
    });
}

export function addMovieToWatched(paylod, dispatch) {
    dispatch({
        type: ADD_MOVIE_TO_WATCHED,
        paylod
    });
}

export function removeMovieFromWatchList(id, dispatch) {
    dispatch({
        type: REMOVE_MOVIE_FROM_WATCHLIST,
        paylod: { id }
    });
}

export function removeMovieFromWatched(id, dispatch) {
    dispatch({
        type: REMOVE_MOVIE_FROM_WATCHED,
        paylod: { id }
    });
}

export function moveToWatched(paylod, dispatch) {
    dispatch({
        type: MOVE_TO_WATCHED,
        paylod
    });
}