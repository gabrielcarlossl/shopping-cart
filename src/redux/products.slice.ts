import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';
import validateProduct from '../API/fake.api';

export interface Product {
    id: string,
    title: string,
    price: number
}

export enum ValidationState {
    Fulfilled,
    Pending,
    Rejected
}

interface ProductSliceState {
    products: Product[],
    validationState?: ValidationState,
    errorMessage?: string
}

export const addProductAsync = createAsyncThunk('products/addNewProduct',async (initialProduct:Product) => {
    const product = await validateProduct(initialProduct)
    return product
})

const initialProducts: Product[] = [
    {
        id: 'eft',
        title: 'Escape from Tarkov',
        price: 60
    },
    {
        id: 'cs2',
        title: 'Counter-Strike 2',
        price: 0
    },
    {
        id: 'sky',
        title: 'Cities Skyline',
        price: 50
    }
]

const initialState: ProductSliceState ={
    products: initialProducts,
    validationState: undefined,
    errorMessage: undefined
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
           // return [action.payload, ...state]
           state.products.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<string>) => ({
            ...state,
            products: state.products.filter(product => product.id !== action.payload)
        }) 
        },
        extraReducers: builder => {
            builder.addCase(addProductAsync.fulfilled, (state, action) => ({
                ...state,
                validationState: ValidationState.Fulfilled,
                errorMessage: undefined,
                products: [...state.products, action.payload]
            }))
            builder.addCase(addProductAsync.rejected, (state, action) => ({
                ...state,
                validationState: ValidationState.Rejected,
                errorMessage: action.error.message
            }))
            builder.addCase(addProductAsync.pending, (state) => ({
                ...state,
                validationState: ValidationState.Pending,
                errorMessage: undefined
            }))
        }
    
})

export const { addProduct, removeProduct } = productsSlice.actions

export const getProductsSelector = (state: RootState) => state.products.products
export const getErrorMessage = (state: RootState) => state.products.errorMessage

export default productsSlice.reducer