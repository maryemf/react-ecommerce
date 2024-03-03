import {useRoutes, BrowserRouter} from 'react-router-dom';
import { ShoppingProvider } from '../../Context';
import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders'
import NotFound from '..//NotFound';
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar';

import './App.css';
import CheckoutSideMenu from '../../Components/CkeckoutSideMenu';
import Register from '../Register';

const AppRoutes = () => {
  let routes = useRoutes([    
    {path: '/', element: <Home />},
    {path: '/:category', element: <Home />},    
    {path: '/account', element: <MyAccount />},
    {path: '/order', element: <MyOrder />},
    {path: '/order/:id', element: <MyOrder />},
    {path: '/orders', element: <MyOrders />},    
    {path: '/orders/last', element: <MyOrder />},    
    {path: '/signin', element: <SignIn />},
    {path: '/register', element: <Register />},
    {path: '/*', element: <NotFound />},
  ])
  return routes;
}

const App = () => { 
  return (
    <ShoppingProvider>
      <BrowserRouter>
        <AppRoutes></AppRoutes>      
        <Navbar></Navbar>
        <CheckoutSideMenu></CheckoutSideMenu>
      </BrowserRouter>
    </ShoppingProvider>
  )
}

export default App
