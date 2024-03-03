import { useContext } from "react";
import { ShoppingContext } from "../../Context";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid";

const Card = ({data}) => {
    const context = useContext(ShoppingContext);
    const addproductToCart = (e, productData) => {
        e.stopPropagation();
        context.setCount(context.count + 1);
        context.setCartProducts([...context.cartProducts, productData]);
        context.openCheckoutSideMenu();
        context.closeProductDetail();
    }

    const showProduct = (productData) => {
        context.openProductDetail();
        context.setSelectedProduct(productData);
    }

    const renderIcon = (id) => {
        const isInCart = context.cartProducts.filter(item => item.id === id).length > 0;
        if (isInCart) {
            return (
                <div 
                    className=" absolute top-0 lg:right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1 py-0.5"
                >
                    <CheckIcon className="h-6 w-6 text-white cursor-pointer"></CheckIcon>
                </div>
            ) 
        } else  {
            return (
                <div 
                    className=" absolute top-0 lg:right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1 py-0.5"
                    onClick={(event) => addproductToCart(event, data)}
                >
                    <PlusIcon className="h-6 w-6 text-black cursor-pointer"></PlusIcon>
                </div>
            )
        }
        
    }

    return (
        <div className="bg-white cursor-pointer w-56 h-60 rounded-lg"
            onClick={() => showProduct(data) }>
            <figure className="relative mb-2 w-full h-4/5"> 
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">{data?.category}</span>
                <img className="w-full h-full object-contain rounded-lg" src={data?.image} alt={data?.title} />
                {renderIcon(data.id)}
            </figure>
            <p className="flex justify-between">
                <span className="text-sm font-light truncate" title={data?.title}>{data?.title}</span>
                <span className="text-lg font-medium">{data?.price}€</span>
            </p>
        </div>
    )
}

export default Card;