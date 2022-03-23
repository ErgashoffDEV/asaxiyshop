import React, {useEffect, useState} from 'react';
import axios from "axios";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import {Link} from "react-router-dom";

export default function Orders() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/main/order_product')
            .then(res => setOrders(res.data.results))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders))
    }, [orders])

    return (
        <div>
            <Search/>
            <Navbar/>
            <h1 className="yor-cart mb-0 has-text-centered is-size-1">My orders</h1>

            {orders.length === 0 && (
                <div className="emptyCart is-flex is-align-items-center is-justify-content-center mt-5">You have not
                    purchased any product.</div>
            )}

            <div className="section">
                <div className="container">
                    <div className='columns is-multiline'>
                        {orders && orders.map(order => (
                            <div className="column is-4">
                                <div className="boxes mt-0">
                                    <Link to={`/product/${order.product.id}`}>
                                        <div className="box-div">
                                            <img width="300px" className="box-img" height="200px" src={`http://localhost:8000${order.product.image}`}
                                             alt="Placeholder image"/>
                                        </div>
                                    </Link>
                                    <p className='content is-size-5'>
                                        <span className="box-text">Customer: </span>
                                        {order.name}
                                    </p>
                                    <p className='content is-size-5'>
                                        <span className="box-text">Product: </span>
                                        {order.product.name}
                                    </p>
                                    <p className='content is-size-5'>
                                        <span className="box-text">Count: </span>
                                        {order.count}
                                    </p>
                                    <p className='content is-size-5'>
                                        <span className="box-text">Total price: </span>
                                        {order.total} sum
                                    </p>
                                    <p className='content is-size-5'>
                                        <span className="box-text">Phone: </span>
                                        {order.phone}
                                    </p>
                                    <p className='content is-size-5'>
                                        <span className="box-text">Address: </span>
                                        {order.address}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
