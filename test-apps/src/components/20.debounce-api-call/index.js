import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import "./debounce.css";

function DebounceApiCall() {
    const [ searchParam, setSearchParam ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ recipes, setRecipes ] = useState([]);
    const debounceParamValue = useDebounce(searchParam, 1000);

    async function fetchListOfRecipes() {
        try {
            setIsLoading(true);
            const apiResponse = await fetch(`https://dummyjson.com/recipes/search?q=${debounceParamValue}`);
            const result = await apiResponse.json();

            if (result && result.recipes && result.recipes.length > 0) {
                setIsLoading(false);
                setRecipes(result.recipes);
            }
            else {
                setIsLoading(false);
                setRecipes([]);
            }
        }
        catch(err) {
            console.error('Error fetching recipes: ', err);
            setIsLoading(false);
            setRecipes([]);
        }
    }

    useEffect(() => {
        // console.log('debounceParamValue: ', debounceParamValue);
        if (debounceParamValue.length > 0)
            fetchListOfRecipes();
    }, [debounceParamValue]);

    return (
        <div className="debounce-container">
            <h1>Debounce API Call</h1>
            <div className="search-wrapper">
                <input
                    type="text"
                    value={searchParam}
                    onChange={(event) => setSearchParam(event.target.value)}
                    placeholder="Enter Recipe Name"
                />
            </div>
            {isLoading ? <h3>Fetching Recipes. Please wait!</h3> : null}
            {debounceParamValue && debounceParamValue.length > 0 ? (
                <ul>
                    {recipes.length > 0
                        ? recipes.map(recipeItem => <li>{recipeItem.name}</li>)
                        : <h3>No Recipes found! Please try with different search</h3>
                    }
                </ul>
            ) : null}
        </div>
    );
}

export default DebounceApiCall;