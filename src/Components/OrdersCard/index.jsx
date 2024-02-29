import { ChevronRightIcon } from "@heroicons/react/24/solid"

const OrdersCart = props => {
    const {totalPrice, totalProducts, date, number} = props.order;
    return (
        <div className="flex flex-col justify-between items-center w-full border border-black rounded-lg mb-4">
            <div className="border-b-2 border-black w-full p-4 ">
                <p className="flex justify-center font-medium text-zinc-800">
                    Order  Number: {number}
                </p>
                
            </div>         
            <div className="flex justify-between w-full p-4">
                <p className="flex flex-col content-center">
                    <span className=" font-light">Placed date: {date}</span>
                    <span className=" font-light">Total articles: {totalProducts}</span>
                </p>
                <p className="flex items-center gap-2">
                    <span className="font-medium text-2xl">{totalPrice}€</span>
                    <span>
                        <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer" />
                    </span>
                </p>
            </div>            
        </div>
    )
}

export default OrdersCart