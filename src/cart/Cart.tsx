import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store.hooks'
import { getCartProducts, getTotalPrice, removeFromCart } from '../redux/cart.slice'


const Cart: React.FC = () => {
    const cartProducts = useAppSelector(getCartProducts)
    const totalPrice = useAppSelector(getTotalPrice)
    const dispatch = useAppDispatch()
    const handleRemoveFromCart = (productId: string) => {
        dispatch(removeFromCart(productId))
    }
  return (
    <>
        <h2>Cart</h2>
        <h4>Total Price: $ {totalPrice}</h4>
        {
            cartProducts.map(product => (
                <div key={product.id}>
                    <span>Product: {product.title} | Price: $ {product.price} | </span>
                    <span>Amount: {product.amount}</span>
                    <button onClick={()=> handleRemoveFromCart(product.id)} >Remove</button>
                </div>
            ))
        }
    </>
  )
}

export default Cart