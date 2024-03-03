import { storageKeys } from "../Utils/index,js";
import useLocalStorage from "./useLocalStorage";

const useLocalUsers = () => {
    const {item:users, saveItem:saveUsers, loading:loadingUsers} = useLocalStorage(storageKeys.users, []);
    const {item:user, saveItem:setUser, loading:loadingUser} = useLocalStorage(storageKeys.loggedUser, {});

    const getUserById = (id) => {
       return users.find((user)=> user.id === id );
    }

    const getUserEmailAndPassword = (email, password) => {
        return users.find((user)=> user.email.toLowerCase() === email 
        && user.password.toLowerCase() === password );
    }

    const setOrdersToUser = (id, orders) => {
        const newUsers = users.map( user => { 
            if ( user.id === id ) {
                return {
                ...user, orders: orders
                }
            } else {
                return user;
            }
        });
        saveUsers(newUsers);
    }

    const getUserOrders = (id) => {
        return  getUserById(id)?.orders || [];
    }

    const addOrderToUser = (id, order)  => {
        const orders = getUserOrders(id);
        const newOrders = [...orders, order];
        setOrdersToUser(id, newOrders);
    }

    const validateExistEmail = (email) => {
        return users.find(user => user?.email?.toLowerCase() === email.toLowerCase()) ? true : false;
    }

    const addUser = (user) => {
        saveUsers([...users, user]);
        
    }

    const updateUser =(updatedUser) => {
        const newUsers = users.filter((user) => user.id != updatedUser.id); 
        saveUsers([...newUsers, updatedUser]);
    }

    return { getUserById, getUserEmailAndPassword, addOrderToUser, getUserOrders, validateExistEmail, addUser,
         user, setUser, loadingUsers, loadingUser, updateUser }

}

export default useLocalUsers;