import React from 'react'
import '../css/Product.css'
import { useNavigate } from 'react-router-dom';

function Product({ product }) {

    const navigate = useNavigate();

    const { id, image, price, title, description } = product;

    return (
        <div className='product-card' >
            <img className='image-product' src={image} alt="" />
            <div>
                <p style={{ fontSize: "20px", textAlign: "center", height: "100px" }} >{title}</p>
                <h3 style={{ textAlign: "center" }} >{price} ₺</h3>
            </div>
            <div>
                <button className='button-product-detail' onClick={() => navigate("product-detail/" + id)} >Ürüne Git</button>
            </div>
        </div>
    )
}

export default Product
