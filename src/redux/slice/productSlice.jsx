import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = 'https://fakestoreapi.com';

const initialState = {
    products: [],
    selectedProduct: {},
    loading: false
}

export const getAllProduct = createAsyncThunk('getAllProduct', async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
})


export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload;
        })
    }
})

export const { setSelectedProduct } = productSlice.actions

export default productSlice.reducer