import { useContext } from "react"
import Layout from "../../Components/Layout"
import OrdersCart from "../../Components/OrdersCard"
import { ShoppingContext } from "../../Context"
import { Link } from "react-router-dom";
function MyOrders() {
  var context = useContext(ShoppingContext);
    return (
      <Layout>
        <div className="flex w-80 items-center justify-center relative mb-4">
          <h1 className=" font-medium text-xl">My orders</h1>
        </div>
        <div className="w-3/5">
          {
            (context.user.orders || []).map((order, index) => (
              <Link key={index} to={`/order/${order.id}`}>
                <OrdersCart order={order}
                />
              </Link>
            ))
          }
        </div>
        
        
      </Layout>
  )
  }
  
  export default MyOrders