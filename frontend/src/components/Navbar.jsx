import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Context} from "../Context";
import {useNavigate} from "react-router-dom";


const Navbar = () => {
    const {loadData} = useContext(Context)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/product/categories')
            .then(res => setCategories(res.data.results))
            .catch(err => console.log(err))
    }, [])

    function clickHome() {
        navigate('/')
    }

    return (
        <header className='sticky'>
            <ul>
                <li className='navbar-links' onClick={() => loadData()} onDoubleClick={() => clickHome()}>
                    All products
                </li>
                {categories.map(category => (
                    <li key={category.id} className='navbar-links' onClick={() => loadData({category: category.id})}>
                        {category.name[0].toUpperCase() + category.name.slice(1)}
                    </li>
                ))}
            </ul>
        </header>
    )
        ;
};

export default Navbar;