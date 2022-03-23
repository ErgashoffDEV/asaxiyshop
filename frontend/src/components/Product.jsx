import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Context} from "../Context"

const Product = () => {
    const [count] = useState(1)
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || '[]')
    const {loadData, products} = useContext(Context)
    const productList = products.length !== 0 ? products.results : []

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addProduct = (product) => {
        const hasItem = cart && cart.filter((item) => item.product.id === product.id)[0]

        if (hasItem) {
            setCart([...cart.filter((item) => item.product.id !== hasItem.product.id), {
                ...hasItem,
                count: hasItem.count + count
            }])
        } else {
            setCart([...cart, {product, count}])
        }
    }

    const showModal = () => {
        let modal = document.querySelector('.bg-modal')
        modal.classList.add('modalb')
    }

    const hideModal = () => {
        let modal = document.querySelector('.bg-modal')
        modal.classList.remove('modalb')
    }
    return (
        <>
            <div className="products" id="blur">
                {productList.map(product => (
                    <div className="product" key={product.id}>
                        <Link to={`/product-data/${product.id}`} style={{textDecoration: 'none'}}>
                            <div className="product-top">
                                <center>
                                    <img src={`http://localhost:8000${product.image}`} className="product-img" alt=""/>
                                </center>
                            </div>
                        </Link>
                        <span className="brand" onClick={() => loadData({brand: product.brand})}>
                            {product.brand}
                        </span>
                        <div className="product-center">

                            <h1 className="product-center-title">{product.name}</h1>

                        </div>
                        <div className="product-bottom">
                            <h4 className="price">{product.price} sum</h4>
                            <button className="addStorage" onClick={() => addProduct(product)}>
                                <svg onClick={() => showModal()} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 25.67 25.24"
                                     className="icon">
                                    <path className="icons"
                                          d="M24.67 9.24h-3.86a1.34 1.34 0 00-.28-.76l-6.67-8a1.33 1.33 0 00-2 0l-6.67 8a1.34 1.34 0 00-.28.76H1a1 1 0 00-.92 1.38L5.4 23.39a3 3 0 002.77 1.85h9.33a3 3 0 002.77-1.85l5.32-12.77a1 1 0 00-.92-1.38zM12.83 19.9a2.67 2.67 0 112.67-2.66 2.66 2.66 0 01-2.67 2.66zM8 9.24l4.85-5.82 4.85 5.82z"
                                          fill="rgb(0, 162, 255)"
                                    />
                                </svg>
                            </button>
                        </div>
                        <center>
                            <Link to={`/confirmOrder/${product.id}/1`}>
                                <button className="order">Order</button>
                            </Link>
                        </center>
                    </div>
                ))}
            </div>

            <div id="modal" className="bg-modal">
                <h3 className="modal-text">Item has been added to the cart.</h3>
                <div className="nothing">
                    <button className="modal-button" onClick={() => hideModal()}>Hide message</button>
                </div>
            </div>
        </>
    )
}

export default Product;