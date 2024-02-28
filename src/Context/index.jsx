import { createContext, useState } from "react";

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
    // Checkout side menu - Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);    
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    return (
        <ShoppingContext.Provider
            value={{ 
                count, setCount, openProductDetail, closeProductDetail, isProductDetailOpen,
                selectedProduct, setSelectedProduct, cartProducts, setCartProducts,
                isCheckoutSideMenuOpen, openCheckoutSideMenu, closeCheckoutSideMenu
            }}
        >
            {children}
        </ShoppingContext.Provider>
    )
}
