import { createContext, useEffect, useState } from "react";
import { storageKeys } from "../Utils/index,js";
import useLocalStorage from "../Hooks/useLocalStorage";
import useLocalUsers from "../Hooks/useLocalUsers";

export const ShoppingContext = createContext();

export const ShoppingProvider =  ({ children }) => { 
    // user
    const {user, setUser} = useLocalUsers();

    // Product Detail - Open/Close
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);    
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);
    // Product Detail - Show product
    const [selectedProduct, setSelectedProduct] = useState({});
    // Shopping cart - Increment quantity
    const [count, setCount] = useState(0);
    // Shopping cart - Add
    const {item:cartProducts, saveItem:setCartProducts} = useLocalStorage(storageKeys.cart, []);
    // const [cartProducts, setCartProducts] = useState([]);
    const [order, setOrder] = useState([]);
    // const {getUserOrders:order, addOrderToUser:setOrder} = useState([]);


    // Checkout side menu - Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);    
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    // Get categories
    const [categories, setCategories] = useState([]);


    // Get products
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    
    // Filter products
    const [searchTerm, setSearchTerm] = useState(null);
    const [category, setCategory] = useState(null);

    const filterItems = (items, searchTerm, filterField='all') => {        
        const term = searchTerm?.toLowerCase().trim() || "";
        return filterField === 'all' 
            ? items.filter(item  => item.title.toLowerCase().includes(term) || item.category.toLowerCase().includes(term) || item.description.toLowerCase().includes(term))
            :  filterField === 'category' ? items.filter(item  => item.category.toLowerCase() === term) : items.filter(item  => item[filterField].toLowerCase().includes(term));  
    }

    useEffect(() => {
        const getApiData = async (url, setStateFunction) => {
            try {
                const response = await fetch(url)
                const data = await response.json()
                setStateFunction(data)
            } catch (error) {
                console.error(`Oh!! An error occurred while retrieving data: ${error}`);
            }
        }
        getApiData('https://fakestoreapi.com/products', setItems);
        getApiData('https://fakestoreapi.com/products/categories', setCategories);
    }, []);

    useEffect(() => {
        setFilteredItems(items)
        if (searchTerm && category) {
            const categoryItems = filterItems(items, category, 'category');
            setFilteredItems(filterItems(categoryItems, searchTerm, 'title'));
        } else {
            if (searchTerm)
                setFilteredItems(filterItems(items, searchTerm));
            if (category)
                setFilteredItems(filterItems(items, category, 'category'));
        }
        return () => {
            setFilteredItems(items)
        }
    }, [items, searchTerm, category]);

    useEffect(() => {
        if (user.id){
            setOrder(user.orders || []);
        }
    }, [user]);

    return (
        <ShoppingContext.Provider
            value={{ 
                count, setCount, openProductDetail, closeProductDetail, isProductDetailOpen,
                selectedProduct, setSelectedProduct, cartProducts, setCartProducts,
                isCheckoutSideMenuOpen, openCheckoutSideMenu, closeCheckoutSideMenu,
                items, setItems, searchTerm, setSearchTerm, filteredItems,
                categories, category, setCategory, user, setUser, order,
                setOrder
            }}
        >
            {children}
        </ShoppingContext.Provider>
    )
}
