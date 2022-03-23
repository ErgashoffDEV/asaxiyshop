import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || '[]')
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || '[]')
    const [product, setProduct] = useState([])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    console.log(typeof cart)
    const removeProduct = (product) => {
        setCart([...cart.filter(item => item !== product)])
    }

    const increase = (item) => {
        const inc = cart.map((i) => {
            if (item.product.id === i.product.id) {
                i.count += 1
            }
            return i
        })
        setCart(inc)
    }

    const decrease = (item) => {
        if (item.count < 2) {
            const newData = cart.filter((elem) => elem.product.id !== item.product.id)
            return setCart(newData)
        }
        const inc = cart.map((i) => {
            if (item.product.id === i.product.id) {
                i.count -= 1
            }
            return i
        })
        setCart(inc)
    }
    return (
        <div>
            <Search cart={cart}/>
            <Navbar/>
            <h1 className="yor-cart">Shopping Cart</h1>

            {cart.length === 0 && (
                <div className="emptyCart is-flex is-align-items-center is-justify-content-center">ADD ITEMS</div>
            )}

            {cart && cart.map((item) => (
                <div key={item.product.id} className="cart container my-4">
                    <img className="cart-image" src={`http://localhost:8000${item.product.image}`} alt=""/>
                    <h4 className="cart-title">{item.product.name}</h4>
                    <button className="decrease" onClick={() => decrease(item)}>-</button>

                    <h1 className="title is-5 mx-3 mt-5">{item.count}</h1>
                    <button className="decrease mr-4" onClick={() => increase(item)}>+</button>

                    <h4 className="cart-price">{item.product.price * item.count} sum</h4>
                    <button onClick={() => removeProduct(item)} className="cart-button">Delete product</button>
                    <Link to={`/confirmOrder/${item.product.id}/${item.count}`}>
                        <button className="create-button">Order</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}
