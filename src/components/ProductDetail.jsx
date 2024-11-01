import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Product from './Product';
import { setSelectedProduct } from '../redux/slice/productSlice';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, openSnackbar } from '../redux/slice/basketSlice';


function ProductDetail() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, selectedProduct } = useSelector((state) => state.product);
    const { image, price, title, description } = selectedProduct;

    const [count, setCount] = useState(0);

    useEffect(() => {
        getProductDetail();
    }, [])

    const getProductDetail = () => {
        products && products.map((product) => {
            if (id == product.id) {
                dispatch(setSelectedProduct(product))
            }
        })
    }

    const increaseCount = () => {
        setCount((prev) => prev + 1);
    }

    const decreaseCount = () => {
        if (count > 0) {
            setCount((prev) => prev - 1);
        }
    }

    const addBasket = () => {
        const payload = {
            id,
            image,
            price,
            title,
            description,
            count
        }
        if (count != 0) {
            dispatch(addToBasket(payload));
            dispatch(openSnackbar());
        }

    }

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div className='product-detail-main' >
                <img src={image} alt="" className='product-detail-image' />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "50px" }} >
                <h2>{title}</h2>
                <p style={{ fontFamily: "arial", textTransform: "capitalize" }}>{description}</p>
                <h1 className='product-detail-price' >{price}₺</h1>

                <div style={{ display: "flex", alignItems: "center" }} >
                    <CiCirclePlus
                        onClick={increaseCount} className='plus-icon' />
                    <span className='product-detail-count' >{count}</span>
                    <CiCircleMinus
                        onClick={decreaseCount} className='minus-icon' />
                </div>

                <div className='add-basket-div'>
                    <button onClick={addBasket} className='add-basket-button' >Sepete Ekle</button>
                </div>
            </div>

        </div>
    )
}

export default ProductDetail
