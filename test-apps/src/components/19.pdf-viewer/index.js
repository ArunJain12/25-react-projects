import { useEffect, useState } from "react";
import {
    PDFDownloadLink,
    PDFViewer,
    Document,
    Page,
    View,
    Text
} from "@react-pdf/renderer";
import "./pdf-viewer.css";

function PdfViewComponent({ productDetails }) {
    return (
        <Document>
            <Page>
                <View>
                    <Text style={{ margin: '12px' }}>1. Product Name: {productDetails.title}</Text>
                    <Text style={{ margin: '12px' }}>2. Description: {productDetails.description}</Text>
                    <Text style={{ margin: '12px' }}>3. Price: {productDetails.price}</Text>
                    <Text style={{ margin: '12px' }}>4. Rating: {productDetails.rating}</Text>
                </View>
            </Page>
        </Document>
    );
}

function PDFViewWrapperComponent({ isProductDetailsLoading, productDetails }) {
    if (isProductDetailsLoading) return <h2>Fetching Product.Please wait!!</h2>;

    if (!productDetails) {
        return <h2>Details for the current product not found.</h2>;
    }
    else {
        return (
            <div className="pdf-viewer-page">
                <PDFViewer style={{ width: "100%", height:"800px" }}>
                    <PdfViewComponent productDetails={productDetails} />
                </PDFViewer>
                <PDFDownloadLink
                    fileName="Product-Details.pdf"
                    document={<PdfViewComponent productDetails={productDetails}/>}
                >
                    <button>Download PDF</button>
                </PDFDownloadLink>
            </div>
        );
    }
}

function PdfViewer() {
    const [ products, setProducts ] = useState([]);
    const [ isProductsLoading, setIsProductsLoading ] = useState(false);
    const [ productDetails, setProductDetails ] = useState(null);
    const [ isProductDetailsLoading, setIsProductDetailsLoading ] = useState(false);
    const [ isProductClicked, setIsProductClicked ] = useState(false);

    useEffect(() => {
        fetchListOfProducts();
    }, []);

    async function fetchListOfProducts() {
        try {
            setIsProductsLoading(true);
            const apiResponse = await fetch("https://dummyjson.com/products?limit=10&skip=0");
            const result = await apiResponse.json();
            if (result && result.products && result.products.length > 0) {
                setIsProductsLoading(false);
                setProducts(result.products);
            }
            else
                throw new Error('Request for fetching products failed: ', result);
        }
        catch (err) {
            console.error(err);
            setIsProductsLoading(false)
            setProducts([]);
        }
    }

    async function handleFetchProductDetails(productId) {
        try {
            setIsProductClicked(true);
            setIsProductDetailsLoading(true);
            const apiResponse = await fetch(`https://dummyjson.com/products/${productId}`);
            const result = await apiResponse.json();
            if (result) {
                setIsProductDetailsLoading(false);
                setProductDetails(result);
            }
            else {
                throw new Error('Request for fetching current product failed: ', result);
            }
        }
        catch (err) {
            console.error(err);
            setIsProductDetailsLoading(false)
            setProductDetails(null);
        }
    }

    // console.log({ products });
    // console.log({ productDetails });

    if (isProductsLoading) {
        return <h2>Fetching Products. Please wait.</h2>
    }

    return (
        <div className="pdf-viewer-container">
            <h1>PDF Viewer</h1>
            <ul>
                {products && products.length > 0 
                    ? products.map(productItem => (
                        <li
                            key={productItem.id}
                            onClick={() => handleFetchProductDetails(productItem.id)}
                        >
                            {productItem.title}
                        </li>
                    ))
                    : null}
            </ul>
            { 
                isProductClicked ? 
                    <PDFViewWrapperComponent 
                        productDetails={productDetails}
                        isProductDetailsLoading={isProductDetailsLoading} 
                    /> : null}
        </div>
    );
}

export default PdfViewer;