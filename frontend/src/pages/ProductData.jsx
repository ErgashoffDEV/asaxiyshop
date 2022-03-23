import React, {useEffect, useState} from 'react';
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

export default function ProductData() {
    const [number, setNumber] = useState(1)
    const [product, setProduct] = useState([])
    const [review, setReview] = useState('')
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || '[]')
    const [user] = useState(JSON.parse(localStorage.getItem('user')))
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/product/product/${params.id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }, [params])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    function check() {
        if (number > 1) {
            setNumber(number - 1)
        }
    }


    const addItem = (product) => {
        setCart(cart.map((item) => {
            if (item.product.id === product.id) {
                item.count += number
            }
            setNumber(1)
            return item
        }))
    }

    const leaveReview = event => {
        let form = document.querySelector('.form')
        event.preventDefault()

        axios.post(`http://localhost:8000/api/v1/product/review`, {
            user: user.id,
            body: review,
            product: product.idC
        })
            .then(() => navigate(`/comments/${product.id}`))
            .catch(err => console.log(err))
        form.reset()
    }

    const showModal = () => {
        let modal = document.querySelector('.bg-modal')
        modal.classList.add('modalb')
    }

    const hideModal = () => {
        let modal = document.querySelector('.bg-modal')
        modal.classList.remove('modalb')
    }

    setTimeout(hideModal, 10000)

    return (
        <div>
            <Search cart={cart}/>
            <Navbar/>
            <div className="container data">
                <div className="columns is-0 is-vcentered is-flex is-justify-content-center is-align-items-center">
                    <div className="column is-5">
                        <div className='data-img is-flex is-justify-content-center is-align-items-center'>
                            <img className="data-img-img" src={`http://localhost:8000${product.image}`} alt=""/>
                        </div>
                    </div>
                    <div className="column is-5">
                        <h2 className="title is-4">{product.name}</h2>
                        <h5 className="title is-4 price-t">{product.price} sum</h5>
                        <h4 className="title is-5">Brand: {product.brand}</h4>
                        <h4 className="title is-5">Availability: available</h4>
                        <div className="inc-div">
                            <h6 className="title is-5 quantity">Quantity:</h6>
                            <button className="decrease" onClick={check}>-</button>
                            <h1 className="title is-5 mx-3">{number}</h1>
                            <button className="decrease" onClick={() => setNumber(number + 1)}>+</button>
                        </div>
                        <div className="bottom-buttons">
                            <button className="carter" onClick={() => addItem(product)}>Add to cart</button>
                            <Link to={`/confirmOrder/${product.id}/${number}`}>
                                <button className="carter">Order</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <hr/>

            <div className="container">
                <div className="columns is-0 is-vcentered is-flex is-justify-content-center is-align-items-center">
                    <div className="column is-5">
                        <form id="smth" className="form m-3" onSubmit={event => leaveReview(event)}>
                            <textarea className='textarea' placeholder="Type something to rate our product..."
                                      onChange={event => setReview(event.target.value)}/>
                            <button onClick={() => showModal()} className='button my-2' type='submit'>Submit
                            </button>
                            <Link to={`/comments/${product.id}`} style={{textDecoration: "none"}}>
                                <button className="button is-fullwidth is-warning my-2">Push to read comments
                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>

            <div id="modal" className="bg-modal">
                <h3 className="modal-text">Thanks for your comment.</h3>
                <div className="nothing">
                    <button className="modal-button" onClick={() => hideModal()}>Hide message</button>
                </div>
            </div>
        </div>
    );
}

