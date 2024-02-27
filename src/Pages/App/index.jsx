import {useRoutes, BrowserRouter} from 'react-router-dom';
import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrder from '../MyOrder';
import MyOrders from '../MyOrders'
import NotFound from '..//NotFound';
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar';

import './App.css';

const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/account', element: <MyAccount />},
    {path: '/order', element: <MyOrder />},
    {path: '/orders', element: <MyOrders />},    
    {path: '/signin', element: <SignIn />},
    {path: '/*', element: <NotFound />},
  ])
  return routes;
}

const App = () => {
  
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <AppRoutes></AppRoutes>      
    </BrowserRouter>
  )
}

export default App
