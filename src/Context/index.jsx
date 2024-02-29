import { createContext, useEffect, useState } from "react";

export const ShoppingContext = createContext();

export const ShoppingProvider =  ({ children }) => {    
    // Product Detail - Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);    
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);
    // Product Detail - Show product
    const [selectedProduct, setSelectedProduct] = useState({});
    // Shopping cart - Increment quantity
    const [count, setCount] = useState(0);
    // Shopping cart - Add
    const [cartProducts, setCartProducts] = useState([]);
    const [order, setOrder] = useState([]);

    // Checkout side menu - Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);    
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    // Get products
    const [items, setItems] = useState(null);

    useEffect(() => {
        // fetch('https://api.escuelajs.co/api/v1/products')
        const fetchData = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json()
            setItems(data)
        } catch (error) {
            console.error(`Oh no, ocurrió un error: ${error}`);
        }
        }
        fetchData()
    }, []);

    return (
        <ShoppingContext.Provider
            value={{ 
                count, setCount, openProductDetail, closeProductDetail, isProductDetailOpen,
                selectedProduct, setSelectedProduct, cartProducts, setCartProducts,
                isCheckoutSideMenuOpen, openCheckoutSideMenu, closeCheckoutSideMenu,
                order, setOrder, items, setItems
            }}
        >
            {children}
        </ShoppingContext.Provider>
    )
}
