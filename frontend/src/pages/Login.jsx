import React, {useEffect, useState} from 'react';
import "../static/login.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function Login() {
    const [data, setData] = useState([])
    const [loginemail, setLoginemail] = useState('')
    const [passwords, setPasswords] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('permissions', JSON.stringify(data.permissions))
    }, [data])

    const loginUser = event => {
        event.preventDefault()

        axios.post('http://localhost:8000/api/v1/users/sign-in', {
            email: loginemail,
            password: passwords
        })
            .then(res => {
                setData(res.data)
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <div className="center">
                <h1 className="login">Login</h1>
                <form method="post" onSubmit={event => loginUser(event)}>
                    <div className="txt_field">
                        <input value={loginemail} onChange={event => setLoginemail(event.target.value)} type="email"
                               required autoComplete="off"/>
                        <span/>
                        <label>Email</label>
                    </div>
                    <div className="txt_field">
                        <input value={passwords} onChange={event => setPasswords(event.target.value)} type="password"
                               required autoComplete="off"/>
                        <span/>
                        <label>Password</label>
                    </div>
                    <input type="submit" value="Login"/>
                    <div className="signup_link">
                        Do not have an account? <Link to="/registrate">Registrate</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;