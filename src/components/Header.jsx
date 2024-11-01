import React, { useEffect, useState } from 'react'
import '../css/Header.css'
import trendyolLogo from '../assets/images/trendyolLogo.png'
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaBasketShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { changeDrawer } from '../redux/slice/basketSlice';


function Header() {

    const [theme, setTheme] = useState(false)

    const { products } = useSelector((state) => state.basket);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        const root = document.getElementById("root");
        if (theme) {
            root.style.backgroundColor = "black";
            root.style.color = "#fff";
        } else {
            root.style.backgroundColor = "#fff";
            root.style.color = "black"
        }
        console.log(theme)
    }, [theme])

    const changeTheme = () => {
        setTheme(!theme)
    }

    return (
        <div className='header-main' >
            <div className='flex-row' style={{ alignItems: "flex-start" }}>
                <img onClick={() => navigate("/")} className='logo' src={trendyolLogo} />
                <p className='header-text' >Mağaza</p>
            </div>

            <div className='flex-row'>
                <input className='input-search' type="text" />
                {
                    theme ? <MdDarkMode onClick={changeTheme} className='icon-theme' /> : <CiLight onClick={changeTheme} className='icon-theme' />
                }

                <Badge badgeContent={products.length} color="warning">
                    <FaBasketShopping onClick={() => dispatch(changeDrawer())} className='icon-basket' />
                </Badge>

            </div>
        </div>
    )
}

export default Header
