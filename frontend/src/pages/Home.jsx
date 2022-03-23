import React, {useState} from 'react';
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()


    function isAuth(){
        return localStorage.getItem('user')
        && localStorage.getItem('user')
        && localStorage.getItem('user')
    }

    console.log(!isAuth() ? console.log('ok') : console.log('not ok'))

    return (
        <div>
            <Search />
            <Navbar />
            <Products />
        </div>
    );
}

