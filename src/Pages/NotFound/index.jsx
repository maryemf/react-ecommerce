import Layout from "../../Components/Layout";
import errorimg from "./errorimg.png";
function NotFound() {
    return (
      <Layout>
        <section className="w-full">
          <div className="flex justify-center items-center lg:flex-row gap-5 flex-col-reverse">
            <div className="py-10 px-10 ml-4">
              <h1 className="text-blue-900 text-5xl font-bold">Page Not Found</h1>
              <p className=" text-blue-800 text-xl font-semibold mt-4">We can&apos;t seem to find the page you&apos;re looking for.</p>              
            </div>
            <div>
              <img className=" w-96" src={errorimg} alt="Not found" />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
  
  export default NotFound