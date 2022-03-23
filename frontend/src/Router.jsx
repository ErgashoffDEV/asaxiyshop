import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Registrate from "./pages/Registrate";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductData from "./pages/ProductData";
import Orders from "./pages/Orders";
import {Context} from "./Context";
import axios from "axios";
import Comments from "./pages/Comments";
import ConfirmOrder from "./pages/ConfirmOrder";

function App() {
    const [products, setProducts] = useState([])

    async function loadData(params) {
        const res = await axios({
            method: 'get',
            url: 'http://localhost:8000/api/v1/product/products',
            params: params,
        })
        setProducts(res.data)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <Context.Provider value={{
            loadData, products, setProducts
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>} exact/>
                    <Route path='/login' element={<Login/>} exact/>
                    <Route path='/registrate' element={<Registrate/>} exact/>
                    <Route path='/cart' element={<Cart/>} exact/>
                    <Route path='/orders' element={<Orders />} exact/>
                    <Route path='/comments/:productId' element={<Comments />} exact/>
                    <Route path='/product-data/:id' element={<ProductData/>} exact/>
                    <Route path='/confirmOrder/:productId/:amount' element={<ConfirmOrder />} exact/>
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    );
}

export default App;