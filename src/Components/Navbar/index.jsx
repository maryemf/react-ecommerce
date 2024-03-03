import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { ShoppingContext } from "../../Context";
import { SignInIcon } from "../Icons/SignInIcon";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid";
import { SignOutIcon } from "../Icons/SignOutIcon";
import { MyOrdersIcon } from "../Icons/MyOrdersIcon";

const Navbar = () => {
    const context = useContext(ShoppingContext);
    const navigate = useNavigate();
    const activeStyle =  'underline underline-offset-4';
    const [menuToggle, setMenuToggle] = useState(false);

    const logOut = () => {
        context.setUser({});
        navigate('/');
    }

    const handleShoppingBagIcon = () => {
        if (context.cartProducts.length) context.openCheckoutSideMenu(true);
    }

    return (
        <>
            <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white">
                <div className="text-3xl font-bold leading-none">
                    <NavLink 
                            to='/' 
                            onClick={()=>context.setCategory('')}
                    >
                        Shopi
                    </NavLink>
                </div>
                <div 
                    className="lg:hidden"
                    onClick={() => setMenuToggle(!menuToggle)}
                >
                    <button className="navbar-burger flex items-center text-blue-600 p-3">
                        <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Mobile menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </button>
                </div>
                <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">                
                    <li className="hover:text-gray-500 font-medium lg:flex hidden">
                        <NavLink 
                            to='/'  
                            className={({ isActive }) => isActive ? activeStyle : undefined }
                            onClick={()=>context.setCategory('')}
                        >
                            All
                        </NavLink>
                    </li>
                    {
                        context.categories.map(category => (
                        <li key={category} className="capitalize font-medium hover:text-gray-500">
                            <NavLink 
                                to={`/${category}`} 
                                className={({ isActive }) => isActive ? activeStyle : undefined }
                                onClick={()=>context.setCategory(category)}
                            >
                                {category}
                            </NavLink>
                        </li> 
                        ))
                    }
                </ul>            
                <ul className="flex items-center gap-3">
                    {context.user.id &&
                        <>
                            <li className=" text-black/60">
                            {context.user.email}
                            </li>
                            <li>
                                <NavLink to='/orders'  className={({ isActive }) => isActive ? activeStyle : undefined }>
                                    <MyOrdersIcon className="cursor-pointer" title="My Orders"/>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/account'  className={({ isActive }) => isActive ? activeStyle : undefined }>
                                    <UserIcon className="h-6 w-6 text-black cursor-pointer" title="My account"/>
                                </NavLink>
                            </li>
                            <li onClick={logOut}>
                                <SignOutIcon className="cursor-pointer" title="Sign out"/>
                            </li>  
                        </>
                    }
                    {!context.user.id && 
                        <li>
                            <NavLink to='/signin'  className={({ isActive }) => isActive ? activeStyle : undefined }>
                                <SignInIcon className="cursor-pointer" title="Sign in"/>
                            </NavLink>
                        </li>
                    }
                    
                    
                    <li className="flex items-center">
                        <ShoppingBagIcon 
                            className="h-6 w-6 text-black cursor-pointer"
                            onClick={handleShoppingBagIcon}
                        ></ShoppingBagIcon>
                        <div>{context.cartProducts.length}</div>                     
                    </li>
                </ul>
            </nav>
            <div className={`navbar-menu relative z-50 ${!menuToggle ? 'hidden' : ''}`}>
                <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                    <div className="flex items-center mb-8">
                        <div className="mr-auto text-3xl font-bold leading-none" href="#">
                                <NavLink 
                                    to='/' 
                                    onClick={()=>[context.setCategory(''), setMenuToggle(false)]}
                            >
                                Shopi
                            </NavLink>
                        </div>
                        <button 
                            className="navbar-close"
                            onClick={() => setMenuToggle(false)}
                        >
                            <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul>
                            <li className="hover:text-gray-500 mb-6 font-semibold">
                            <NavLink 
                                to='/'  
                                className={({ isActive }) => isActive ? activeStyle : undefined }
                                onClick={()=>[context.setCategory(''), setMenuToggle(false)]}
                            >
                                All
                            </NavLink>
                        </li>
                        {context.categories.map(category => (
                            <li key={category} className="capitalize hover:text-gray-500 mb-6 font-semibold">
                                <NavLink 
                                    to={`/${category}`} 
                                    className={({ isActive }) => isActive ? activeStyle : undefined }
                                    onClick={()=>[context.setCategory(category), setMenuToggle(false)]}
                                >
                                    {category}
                                </NavLink>
                            </li> 
                            ))
                        }
                        </ul>
                    </div>
                    
                </nav>
            </div>
        </>
    )
}

export default Navbar;