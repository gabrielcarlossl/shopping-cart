import React, { useState } from 'react'
import { Product, addProduct, addProductAsync, getErrorMessage } from '../redux/products.slice'
import { useAppDispatch } from '../redux/store.hooks'
import { useSelector } from 'react-redux'



const ProductForm: React.FC = () => {

    const dispatch = useAppDispatch()
    const errorMessage = useSelector(getErrorMessage)

    const [product, setProduct] = useState<Product>({
        id: '',
        title: '',
        price: 0
    })

    const handleChange = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) => setProduct(prev => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (prev as any)[name] = value
        const newValue = {...prev}
        return newValue
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(addProductAsync(product))
    }
    return (
        <>
            <h2>Add Game to The Store</h2>
            {
                errorMessage && <span>Error: {errorMessage}</span>
            }
            <form onSubmit={handleSubmit} action="">
                <input style={{border: errorMessage ? '1px solid red' : '1px solid black'}} type="text" placeholder='id' name='id' value={product.id} onChange={handleChange} />
                <input style={{border: errorMessage ? '1px solid red' : '1px solid black'}} type="text" placeholder='Game title' name='title' value={product.title} onChange={handleChange} />
                <input style={{border: errorMessage ? '1px solid red' : '1px solid black'}} type="number" placeholder='Price' name='price' value={product.price} onChange={handleChange} />
                <button style={{backgroundClip: errorMessage ? 'red' : ''}} type='submit'>Add Game</button>
            </form>
        </>
    )
}

export default ProductForm