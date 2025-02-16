import React, { useEffect, useReducer } from "react";
import { MovieReducer } from "../reducer/movieReducer";
import useDebounce from "../../20.debounce-api-call/useDebounce";
import {
    setSearchMovieParam,
    setIsRequestLoading,
    setMovies,
    setErrors,
    addMovieToWatchList,
    addMovieToWatched,
    removeMovieFromWatchList,
    removeMovieFromWatched,
    moveToWatched
} from "../actions/movieActions";

export const MovieContext = React.createContext(null);
const tmbi_api_key = '';

const initialState = {
    searchMovieParam: '',
    isRequestLoading: false,
    movieResults: [],
    movieErrors: '',
    watchList: localStorage.getItem('watchList') ? JSON.parse(localStorage.getItem('watchList')) : [],
    watched: localStorage.getItem('watched') ? JSON.parse(localStorage.getItem('watched')) : []
};

function GlobalState({ children }) {
    const [ state, dispatch ] = useReducer(MovieReducer, initialState);
    const debouncedSearchMovieParamValue = useDebounce(state.searchMovieParam, 500);

    async function fetchListOfMovies() {
        try {
            setIsRequestLoading(true, dispatch);
            const apiResponse = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${tmbi_api_key}&query=${debouncedSearchMovieParamValue}&include_adult=false&language=en-US&page=1`
            );
            const apiResult = await apiResponse.json();
            // console.log('Movies Found: ', apiResult);
            if (apiResult && apiResult.results && apiResult.results.length > 0) {
                setMovies(apiResult.results, dispatch);
                setIsRequestLoading(false, dispatch);
            }
            else
                throw new Error('Please try any other value for search');
        }
        catch(err) {
            setIsRequestLoading(false, dispatch);
            console.error('Error fetching movies: ', err);
            setErrors('Error while fetching the movies. Please try again.')
        }
    }

    useEffect(() => {
        // console.log({ debouncedSearchMovieParamValue });
        if (debouncedSearchMovieParamValue !== '')
            fetchListOfMovies();

    }, [debouncedSearchMovieParamValue]);

    useEffect(() => {
        localStorage.setItem('watchList', JSON.stringify(state.watchList));
        localStorage.setItem('watched', JSON.stringify(state.watched));
    }, [state.watchList, state.watched]);

    return (
        <MovieContext.Provider
            value={{
                state,
                tmbi_api_key,
                setSearchMovieParam: (value) => setSearchMovieParam(value, dispatch),
                addMovieToWatchList: (value) => addMovieToWatchList(value, dispatch),
                addMovieToWatched: (value) => addMovieToWatched(value, dispatch),
                removeMovieFromWatchList: (id) => removeMovieFromWatchList(id, dispatch),
                removeMovieFromWatched: (id) => removeMovieFromWatched(id, dispatch),
                moveToWatched: (value) => moveToWatched(value, dispatch)
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}

export default GlobalState;