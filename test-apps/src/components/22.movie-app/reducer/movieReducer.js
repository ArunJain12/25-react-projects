import {
    SET_MOVIE_SEARCH_PARAM,
    SET_MOVIES,
    SET_ERRORS,
    ADD_MOVIE_TO_WATCHLIST,
    REMOVE_MOVIE_FROM_WATCHLIST,
    ADD_MOVIE_TO_WATCHED,
    REMOVE_MOVIE_FROM_WATCHED,
    MOVE_TO_WATCHED
} from "../actions/movieActions";

export function MovieReducer(state, action) {
    const { type, paylod } = action;
    switch (type) {
        case SET_MOVIE_SEARCH_PARAM:
            return {
                ...state,
                searchMovieParam: paylod
            };

        case SET_MOVIES:
            return {
                ...state,
                movieResults: paylod
            };

        case SET_ERRORS:
            return {
                ...state,
                movieErrors: paylod
            };

        case ADD_MOVIE_TO_WATCHLIST:
            return {
                ...state,
                watchList: [paylod, ...state.watchList]
            };

        case ADD_MOVIE_TO_WATCHED:
            return {
                ...state,
                watched: [paylod, ...state.watched]
            };

        case REMOVE_MOVIE_FROM_WATCHLIST: {
            return {
                ...state,
                watchList: state.watchList.filter(movie => movie.id !== paylod.id)
            };
        }

        case REMOVE_MOVIE_FROM_WATCHED: {
            return {
                ...state,
                watched: state.watched.filter(movie => movie.id !== paylod.id)
            };
        }

        case MOVE_TO_WATCHED: {
            return {
                ...state,
                watchList: state.watchList.filter(movie => movie.id !== paylod.id),
                watched: [paylod, ...state.watched]
            };
        }

        default:
            return state;
    }
}