import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../redux/slice/productSlice';
import Product from './Product';

function ProductList() {

    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product)

    useEffect(() => {
        dispatch(getAllProduct())
    }, [])


    console.log(products)

    return (
        <div className='flex-row' style={{ flexWrap: "wrap" }} >
            {
                products && products.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            }
        </div>
    )
}

export default ProductList
