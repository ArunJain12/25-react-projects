import { useEffect, useState } from "react";

export default function useCustomFetch(url, options = {}) {
    const [ data, setData ] = useState();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    async function fetchData() {
        setIsLoading(true);
        try {
            const response= await fetch(url, {...options});
            if (!response.ok) throw new Error(response.statusText);

            const result = await response.json();
            setData(result);
            setError(null);
            setIsLoading(false);
        }
        catch(err) {
            setError(`Error Occured. ${err}`);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, isLoading, error };
}