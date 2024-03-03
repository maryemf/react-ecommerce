import {useEffect, useState} from 'react';

// Custom hook for using localStorage
const useLocalStorage = (itemName, initialValue) => { 
    const[item, setItem] = useState(initialValue);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(false);
    useEffect(()=> {      
        setTimeout(() => {
            try {
              const parsedItem = JSON.parse(localStorage.getItem(itemName)) || initialValue;
              setItem(parsedItem);
            } catch (e) {
              setLoading(false);
              setError(true);
            }
            setLoading(false);
          }, 500);
    }, [itemName, initialValue]);

    const saveItem = (newItem) => {
        setItem(newItem);
        localStorage.setItem(itemName, JSON.stringify(newItem));
    }
    return {item, saveItem, loading, error};
}

export default useLocalStorage;