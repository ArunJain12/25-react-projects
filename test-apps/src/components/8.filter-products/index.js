import { useEffect, useState } from "react";
import "./filter.css";

function FilterProductsByCategory() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ products, setProducts ] = useState([]);
    const [ currentSelectedCategory, setCurrentSelectedCategory ] = useState('');
    const [ filteredProducts, setFilteredProducts ] = useState([]);

    async function fetchAllProducts() {
        try {
            setIsLoading(true);
            const makeProductsApi = await fetch('https://dummyjson.com/products?limit=60', {
                method: 'GET'
            });
            const productsResponse = await makeProductsApi.json();
            // console.log('Fetched Products: ', productsResponse);
            setProducts(productsResponse?.products);
            setIsLoading(false);
        }
        catch (error) {
            // console.log('Error Fetching Products: ', error);
            setIsLoading(false);
            setProducts([]);
        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, []);

    useEffect(() => {
        const productsCopy = [...products];
        setFilteredProducts(
            currentSelectedCategory === ''
                ? productsCopy
                : productsCopy.filter(productItem => productItem.category.toLowerCase() === currentSelectedCategory.toLowerCase())
        );
    }, [products, currentSelectedCategory]);

    function handleSelectedCategory(categorySelected) {
        if (categorySelected !== '' && categorySelected === currentSelectedCategory)
            setCurrentSelectedCategory('');
        else
            setCurrentSelectedCategory(categorySelected);
    }

    const uniqueCategories = [...new Set(products.map(productItem => productItem.category))];
    // console.log({ uniqueCategories });

    if (isLoading)
        return <div className="filter-products-container"><h2>Fetching Products. Please wait!</h2></div>;

    if (products.length === 0)
        return <h2>No Products Found</h2>;

    return (
        <div className="filter-products-container">
            <h1>Filter Products By Category</h1>
            {
                uniqueCategories && uniqueCategories.length > 0
                    ? <div className="filter-categories-container">
                        {uniqueCategories.map(uniqueCategoryItem => (
                            <button
                                key={uniqueCategoryItem}
                                className={`${currentSelectedCategory === uniqueCategoryItem ? 'active' : ''}`}
                                onClick={() => handleSelectedCategory(uniqueCategoryItem)}
                            >
                                {uniqueCategoryItem}
                            </button>
                        ))
                        }
                    </div>
                    : null
            }
            <ul className="list-of-products">
                {filteredProducts && filteredProducts.length > 0
                    ? filteredProducts.map(productItem => (
                        <li key={productItem.id}>
                            <p>{productItem.title}</p>
                            <button>{productItem.category}</button>
                        </li>
                    ))
                    : null
                }
            </ul>
        </div>
    );
}

export default FilterProductsByCategory;