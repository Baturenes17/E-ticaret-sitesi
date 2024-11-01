import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slice/productSlice'
import basketReducer from './slice/basketSlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        basket: basketReducer
    },
})