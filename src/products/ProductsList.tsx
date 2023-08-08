import React from 'react'
import { useSelector } from 'react-redux'
import { Product, getProductsSelector, removeProduct } from '../redux/products.slice'
import { useAppDispatch } from '../redux/store.hooks'
import { addToCart } from '../redux/cart.slice'



const ProductsList: React.FC = () => {
    const products = useSelector(getProductsSelector)
    const dispatch = useAppDispatch()

    const removeFromStore = (id: string) => dispatch(removeProduct(id))

    const addToCartHandler = (product: Product) => dispatch(addToCart(product))
    return (
        <div className=''>
            <hr />
            <h1>Games List</h1>
            <hr />

            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.title}</h3>
                    <h4>Price: ${product.price}</h4>
                    <button onClick={() => addToCartHandler(product)} >Add to Cart</button>
                    <button onClick={() => removeFromStore(product.id)}>Remove</button>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ProductsList