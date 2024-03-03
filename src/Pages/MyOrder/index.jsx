import { useContext } from "react";
import Layout from "../../Components/Layout";
import { ShoppingContext } from "../../Context";
import OrderCart from "../../Components/OrderCard";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { totalPrice } from "../../Utils/index,js";

function MyOrder() {
  const context = useContext(ShoppingContext);
  const {id} = useParams();
  const orders = id ? (context.user.orders || []).filter(order => order.id === id)[0] :  (context.user.orders || [])?.slice(-1)[0];
    return (
      <Layout>        
        <div className="flex w-80 items-center justify-center relative mb-6">
          <Link to="/orders" className="absolute left-0">
            <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer "  />
          </Link>
          <h1  className=" font-medium text-xl">My order</h1>
        </div>
          <div className="flex flex-col w-3/5">
          {
              orders?.products?.map(product => (
                  <OrderCart 
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      imageUrl={product.image}
                      price={`${product.price}€`}
                  />
              ))
          }      
        </div>
        {orders?.products && 
          <div className="flex flex-col w-3/5">
            <div className="flex justify-between items-center mb-3">
              <p></p>
              <p className="w-1/5 border-t-2 text-right font-medium text-2xl">{orders?.products ? totalPrice(orders.products) : 0}€</p>
            </div>
          </div>
        }
      </Layout>
    )
  }
  
  export default MyOrder;