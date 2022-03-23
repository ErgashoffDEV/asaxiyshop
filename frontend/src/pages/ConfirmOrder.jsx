import React, {useEffect, useState} from 'react';
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

export default function ConfirmOrder() {
    const [product, setProduct] = useState([])
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [user] = useState(JSON.parse(localStorage.getItem('user')))
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/product/product/${params.productId}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }, [params])

    const createOrder = event => {
        event.preventDefault()

        axios.post('http://127.0.0.1:8000/api/v1/main/order_product', {
            name, address, phone,
            user: user.id,
            product: product.id,
            total: product.price * params.amount,
            count: params.amount
        })
            .then(() => navigate('/orders'))
            .catch(err => console.log(err))
    }


    return (
        <div>
            <Search/>
            <Navbar/>
            <section className="section">
                <div className="title has-text-centered is-size-1">Create order</div>
                <div className="columns">
                    <div className="column">
                        <div className="box">
                            <form onSubmit={event => createOrder(event)}>
                                <div className="title">Shipping information</div>
                                <label htmlFor="name" className='label'>
                                    Write your name
                                    <input type="text" className='input' id='name'
                                           onInput={event => setName(event.target.value)} name='name'/>
                                </label>
                                <label htmlFor="address" className='label'>
                                    Write your address
                                    <input type="text" className='input' id='address'
                                           onInput={event => setAddress(event.target.value)} name='address'/>
                                </label>
                                <label htmlFor="phone" className='label'>
                                    Write your phone number
                                    <input type="tel" className='input' id='phone'
                                           onInput={event => setPhone(event.target.value)} name='phone'/>
                                </label>
                                <button type='submit' className='button is-fullwidth is-success'>Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="column is-8">
                        <div className="box">
                            <div
                                className="columns is-0 is-vcentered is-flex is-justify-content-center is-align-items-center">
                                <div className="column is-5">
                                    <img className="data-img-img" src={`http://localhost:8000${product.image}`} alt=""/>
                                </div>
                                <div className="column is-5">
                                    <h2 className="title is-4">{product.name}</h2>
                                    <h5 className="title is-4 price-t">{product.price} sum</h5>
                                    <h4 className="title is-5">Brand: {product.brand}</h4>
                                    <h4 className="title is-5">Availability: available</h4>
                                    <h4 className="title is-5">Amount: {params.amount}</h4>
                                    <h4 className="title is-5">Total: {product.price * params.amount}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>

    );
};