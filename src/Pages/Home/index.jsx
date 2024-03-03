
import { useContext } from "react";
import { ShoppingContext } from "../../Context";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { NoResultIcon } from "../../Components/Icons/NoResultsIcon";

function Home() {
  const context = useContext(ShoppingContext);
  const handleChange = (e) => {
    context.setSearchTerm(e.target.value);
  }

  return (
      <Layout>
        <div className="flex w-80 items-center justify-center relative mb-4">
          <h1 className=" font-medium text-xl">Exclusive products</h1>
        </div>
        <input 
          className="rounded-lg border border-black w-80 p-3 mb-4 focus:outline-none" 
          type="text" 
          placeholder="Search a product"
          onChange={handleChange}
        />
        {/* <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 w-full max-w-screen-lg mt-10 content-center"> */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {
            context.filteredItems?.map( (item) => (
              <Card key={item.id} data={item}/>
            ))
          }
        </div>
        {
          (context.searchTerm && !context.filteredItems.lenght) &&
          <div className="flex justify-between gap-4 content-center items-center">
            <span>Not results found </span>
            <NoResultIcon />
          </div>
        }
        <ProductDetail></ProductDetail>
      </Layout>
  )
}

export default Home;
