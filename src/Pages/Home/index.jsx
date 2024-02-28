import { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";

function Home() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    // fetch('https://api.escuelajs.co/api/v1/products')
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.error(`Oh no, ocurrió un error: ${error}`);
      }
    }
    fetchData()
  }, [])

  //   fetch('https://fakestoreapi.com/products')
  //           .then(res=>res.json())
  //           .then(json=> setItems(json))
  // }, [])


  return (
      <Layout>
        <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg mt-10">
          {
            items?.map( (item) => (
              <Card key={item.id} data={item}/>
            ))
          }
        </div>
        <ProductDetail></ProductDetail>
      </Layout>
  )
}

export default Home;
