import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../Context";
import logo from '../static/logo.svg'

const Search = () => {
    const [cart] = useState(JSON.parse(localStorage.getItem("cart")) || '[]')
    const [value, setValue] = useState('')
    const {loadData} = useContext(Context)
    const [data] = useState(JSON.parse(localStorage.getItem('user')) || '[]')
    const navigate = useNavigate()

    useEffect (() => {
        localStorage.setItem('user', JSON.stringify(data))
    }, [data])

    function signOut(){
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('permissions')
        navigate('/login')
    }

    return (
        <div className="search">
            <div className="search-left">
                <img className="img" src={logo}
                     width="150px" height="50px" alt="" onClick={() => navigate('/')}/>
            </div>
            <div className="search-right">
                <form>
                    <input
                        value={value}
                        onInput={(event => setValue(event.target.value))}
                        onChange={() => loadData({search: value})}
                        className="search-input"
                        type="text"
                        placeholder="Search..."
                    />
                    <button className="search-button">Search</button>
                </form>

            </div>
            <div className="search-far">
                <Link to='/cart' style={{textDecoration: "none"}}>
                    <h1 className="cart-text">Cart<sup>{cart.length || '0'}</sup></h1>
                </Link>
                <Link to='/orders' style={{textDecoration: "none"}}>
                    <h1 className="cabinet-text">My orders</h1>
                </Link>
                <button className='button is-danger' onClick={signOut}>
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default Search;