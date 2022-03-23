import React, {useEffect, useState} from 'react';
import axios from "axios";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import {useParams} from "react-router-dom";
import Comment from "../components/Comment";

const Comments = () => {
    const [product, setProduct] = useState([])
    const params = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/product/product/${params.productId}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }, [params])

    const comments = product ? product.review : []

    return (
        <div>
            <div>
                <Search/>
                <Navbar/>
                <h1 className="yor-cart mb-0 has-text-centered">Comments for {product.name}</h1>
                <div className="section">
                    <div className="container">
                        {comments && comments.map(comment => (
                            <div key={comment.id}>
                                <Comment body={comment.body} user={comment.user.email} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;