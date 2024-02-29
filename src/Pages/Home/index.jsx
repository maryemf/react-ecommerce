
import { useContext } from "react";
import { ShoppingContext } from "../../Context";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";

function Home() {
  const context = useContext(ShoppingContext);
  return (
      <Layout>
        <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg mt-10">
          {
            context.items?.map( (item) => (
              <Card key={item.id} data={item}/>
            ))
          }
        </div>
        <ProductDetail></ProductDetail>
      </Layout>
  )
}

export default Home;
