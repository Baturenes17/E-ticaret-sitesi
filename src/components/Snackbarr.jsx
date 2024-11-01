import { Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from '../redux/slice/basketSlice';

function Snackbarr() {

    const vertical = 'bottom';
    const horizontal = 'right';

    const { snackbarActivity } = useSelector((state) => state.basket);
    const dispatch = useDispatch();

    return (

        <div>
            <Snackbar anchorOrigin={{ vertical, horizontal }}
                open={snackbarActivity}
                autoHideDuration={2000}
                onClose={() => dispatch(closeSnackbar())}
                message="Ürün Sepete Eklendi" />
        </div >
    )
}

export default Snackbarr
