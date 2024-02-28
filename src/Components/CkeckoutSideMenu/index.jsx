import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingContext } from '../../Context';
import './styles.css';
import OrderCart from '../OrderCard';
import { totalPrice } from '../../Utils/index,js';

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingContext);
    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter( (product) => product.id !== id); 
        context.setCartProducts(filteredProducts);
    }

    return (
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} ckeckout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className="flex justify-between items-center p-6">
                <h2 className=" font-medium text-xl">My Order</h2>
                <div>
                    <XMarkIcon 
                        className="h-6 w-6 text-black cursor-pointer" 
                        onClick={() => context.closeCheckoutSideMenu()} />
                </div>
            </div>
            <div className="px-6 mb-5 overflow-y-auto">
                {
                    context.cartProducts.map((product) => (
                        <OrderCart 
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            imageUrl={product.image}
                            price={`${product.price}€`}
                            handleDelete= {handleDelete}
                        />
                    ))
                }      
            </div>
            <div className="px-6 ">
                <p className='flex justify-between items-center'>
                    <span className='font-light'>Total</span>
                    <span className=' font-medium text-2xl'>{totalPrice(context.cartProducts)}€</span>
                </p>

            </div>
            
        </aside>
    )
}

export default CheckoutSideMenu;