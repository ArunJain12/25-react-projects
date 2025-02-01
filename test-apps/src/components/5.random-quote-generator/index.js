import { useEffect, useState } from 'react';
import './quote.css';

function RandomQuoteGenerator() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ quote, setQuote ] = useState(null);

    async function fetchQuote() {
        setIsLoading(true);
        try {
            const apiRequest = await fetch('https://dummyjson.com/quotes/random', {
                method: 'GET'
            });
            const apiResponse = await apiRequest.json();
            // console.log('api', apiResponse);
            if (apiResponse) {
                setQuote({
                    quoteAuthor: apiResponse.author,
                    quoteContent: apiResponse.quote
                });
            }
            else setQuote(null);
            setIsLoading(false);
        }
        catch(error) {
            setIsLoading(false);
            setQuote(null);
            console.log(error);
        }
    }

    useEffect(() => {
        fetchQuote();
    }, []);

    function handleRefresh() {
        fetchQuote();
    }

    if (isLoading) {
        return <h3>Fetching Quote! Please wait.</h3>;
    }
    if (quote == null)
        return <h3>No Quote Found.</h3>;

    return (
        <div className='random-quote-generator'>
            <h1>Random Quote Generator</h1>
            <div className='quote-wrapper'>
                <p>{quote?.quoteAuthor}</p>
                <p>{quote?.quoteContent}</p>
            </div>
            <button className='refresh-button' onClick={handleRefresh}>Refresh</button>
        </div>
    )
}

export default RandomQuoteGenerator;