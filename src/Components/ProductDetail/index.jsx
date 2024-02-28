import { useContext } from 'react';
import './styles.css';
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingContext } from '../../Context';



const ProductDetail = () => {
    const context = useContext(ShoppingContext);    
    return (
        <aside className={`${context.isProductDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className="flex justify-between items-center p-6">
                <h2 className=" font-medium text-xl">Detail</h2>
                <div>
                    <XMarkIcon 
                        className="h-6 w-6 text-black cursor-pointer" 
                        onClick={() => context.closeProductDetail()} />
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto items-center">
                <figure className="px-6 w-56 h-60 content-center">
                <img 
                    className=" w-full h-full rounded-lg object-contain"
                    src={context.selectedProduct?.image} 
                    alt={context.selectedProduct?.title}
                />
            </figure>
            
           
            <p className="flex flex-col p-6">
                <span className='font-medium text-2xl text-right'>{context.selectedProduct.price}€</span>
                <span className='font-medium text-md m-5'>{context.selectedProduct.title}</span>
                <span className={`font-light text-sm`}>{context.selectedProduct.description }</span>
            </p>
            </div>
        </aside>
    )
}

export default ProductDetail;