import { createContext, useEffect, useState } from 'react';
import useDebounce from '../../20.debounce-api-call/useDebounce';

export const MovieContext = createContext(null);
const tmbi_api_key = "";

function GlobalState({ children }) {
    const [ searchMovieParam, setSearchMovieParam ] = useState('');
    const [ isRequestLoading, setIsRequestLoading ] = useState(false);
    const [ movieResults, setMovieResults ] = useState([]);
    const debouncedSearchMovieParamValue = useDebounce(searchMovieParam, 500);

    async function fetchListOfMovies() {
        try {
            setIsRequestLoading(true);
            const apiResponse = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${tmbi_api_key}&query=${debouncedSearchMovieParamValue}&include_adult=false&language=en-US&page=1`
            );
            const result = await apiResponse.json();
            console.log('Movies Found: ', result);
            if (result && result.results && result.results.length > 0) {
                setMovieResults(result.results);
                setIsRequestLoading(false);
            }
            else
                throw new Error('Please try any other value for search');
        }
        catch(err) {
            setIsRequestLoading(false);
            console.error('Error fetching movies: ', err);
            setMovieResults([]);
        }
    }

    useEffect(() => {
        // console.log({ debouncedSearchMovieParamValue });
        if (debouncedSearchMovieParamValue !== '')
            fetchListOfMovies();
    }, [debouncedSearchMovieParamValue]);

    return (
        <MovieContext.Provider
            value={{
                searchMovieParam,
                setSearchMovieParam,
                movieResults,
                isRequestLoading,
                tmbi_api_key
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}

export default GlobalState;