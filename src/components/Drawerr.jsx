import { Drawer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeDrawer, cleanBasket, decreaseProductCount, deleteProductFromBasket, increaseProductCount, totalBasketPrice } from '../redux/slice/basketSlice';
import { FaRegTrashAlt } from "react-icons/fa";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import '../css/Drawer.css'


function Drawerr() {

    const { products, drawerActivity, total } = useSelector((state) => state.basket);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(totalBasketPrice())
    }, [products])

    return (
        <div>
            <Drawer anchor='right' open={drawerActivity} onClose={() => dispatch(changeDrawer())}>

                <div style={{ borderBottom: "1px solid lightgrey", paddingLeft: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                    <p style={{ fontFamily: "arial", fontWeight: "600", fontSize: "22px" }} >ÜRÜNLER</p>
                    <button className='cleanBasket' onClick={() => dispatch(cleanBasket())} >Sepeti Sil</button>
                </div>

                {
                    products && products.map((product) => {
                        return (
                            <div key={product.id} className='flex-row' style={{ padding: "15px" }}>
                                <img style={{ width: "100px", height: "100px" }} src={product.image} alt="" />
                                <p style={{ width: "300px", margin: "0px 20px" }}>{product.title} ({product.count})</p>
                                <h3 style={{ width: "80px" }}>{product.price} ₺</h3>
                                <div className='flex-row' style={{ marginLeft: "10px" }}>
                                    <CiCircleMinus onClick={() => dispatch(decreaseProductCount(product))} style={{ fontSize: "25px", marginRight: "5px", cursor: "pointer" }} />
                                    <CiCirclePlus onClick={() => dispatch(increaseProductCount(product))} style={{ fontSize: "25px", marginRight: "5px", cursor: "pointer" }} />
                                    <FaRegTrashAlt className='trash-icon' onClick={() => dispatch(deleteProductFromBasket(product))} style={{ fontSize: "25px", marginRight: "5px", cursor: "pointer" }} />
                                </div>
                            </div>
                        )
                    })
                }

                <div className='drawer-bottom'>Sepet Tutarı : {total.toFixed(2)}</div>
            </Drawer>
        </div>
    )
}

export default Drawerr
