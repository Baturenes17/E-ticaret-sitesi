import { createSlice } from "@reduxjs/toolkit";

const getBasketFromStorage = () => {
    if (localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"))
    }
    else {
        return [];
    }
}

const initialState = {
    products: getBasketFromStorage(),
    drawerActivity: false,
    snackbarActivity: false,
    total: 0
}

const writeFromBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.products && state.products.find((product) => product.id === action.payload.id);

            if (findProduct) {
                const extractedProducts = state.products.filter((product) => product.id != action.payload.id);
                findProduct.count += action.payload.count;
                state.products = [...extractedProducts, findProduct];
                writeFromBasketToStorage(state.products);
            } else {
                state.products = [...state.products, action.payload];
                writeFromBasketToStorage(state.products);
            }
        },

        changeDrawer: (state) => {
            if (state.products.length == 0) {
                state.drawerActivity = false;
            } else {
                state.drawerActivity = !state.drawerActivity;
            }
        },

        closeSnackbar: (state) => {
            state.snackbarActivity = false;
        },

        openSnackbar: (state) => {
            state.snackbarActivity = true;
        },

        cleanBasket: (state) => {
            state.products = [];
            state.total = 0;
            state.drawerActivity = false;
            localStorage.clear();
        },

        increaseProductCount: (state, action) => {
            const product = state.products && state.products.find((e) => e.id === action.payload.id);
            if (product) {
                product.count += 1;
                writeFromBasketToStorage(state.products);
            }
        },

        decreaseProductCount: (state, action) => {
            const product = state.products && state.products.find((e) => e.id === action.payload.id);
            if (product.count > 0) {
                product.count -= 1;
                writeFromBasketToStorage(state.products);
            }

            if (product.count == 0) {
                const newProduct = state.products.filter((product) => product.id != action.payload.id);
                state.products = [...newProduct];
                writeFromBasketToStorage(state.products);
            }

            if (state.products.length == 0) {
                state.drawerActivity = false;
            }
        },

        totalBasketPrice: (state) => {
            state.total = 0;
            state.products.forEach((product) => {
                state.total += product.price * product.count;
            })
        },

        deleteProductFromBasket: (state, action) => {
            const newBasket = state.products && state.products.filter((product) => product.id !== action.payload.id);
            state.products = [...newBasket];
            if (state.products.length == 0) {
                state.drawerActivity = false;
            }
            writeFromBasketToStorage(state.products);
        }

    }
})

export const { addToBasket, changeDrawer, closeSnackbar, openSnackbar, cleanBasket, increaseProductCount, decreaseProductCount, totalBasketPrice, deleteProductFromBasket } = basketSlice.actions

export default basketSlice.reducer