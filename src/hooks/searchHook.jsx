import { useState } from "react";
import { UseGetProducts } from "../../hooks/useProducts";
import { useEffect } from "react";

export const UseSearchFilter=()=>{
    const [showNoResults, setShowNoResults] = useState(false);
    const { getProducts, products, Loading } = UseGetProducts();
    const [searchProduct, setSearchProduct] = useState('');

    useEffect(() => {
        getProducts()
    }, [showNoResults]);
    
    function filterProducts() {
        console.log('Filtering products');
        const filtered = products.filter((product) => {
            const productNameMatches =
                searchProduct.toLowerCase() === '' ||
                product?.productName?.toLowerCase().includes(searchProduct.toLowerCase());

            const arrayMatches =
                product?.categories?.some((category) =>
                    category.toLowerCase().includes(searchProduct.toLowerCase())
                ) || false;

            return productNameMatches || arrayMatches;
        });
        console.log('Filtered products:', filtered);
        setShowNoResults(filtered.length === 0);
        return filtered;
    }
    return{ filterProducts, showNoResults,setShowNoResults, products, Loading, searchProduct, setSearchProduct }
}