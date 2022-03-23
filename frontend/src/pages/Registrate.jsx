import React, {useEffect, useState} from 'react';
import "../static/registrate.css"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function Registrate() {
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(data))
    }, [data])

    const registrateUser = event => {
        event.preventDefault()

        axios.post('http://localhost:8000/api/v1/users/sign-up', {
            first_name: name,
            last_name: surname,
            email: mail,
            password: password,
        })
            .then(res => {
                setData(res.data)
                navigate('/login')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <form className="wrapper" onSubmit={event => registrateUser(event)}>
                <h1 className="title">Registration Form</h1>

                <div className="flexer">
                    <label className="label-form" htmlFor="name">Your name:</label>
                    <input className="input-form" type="text" id="name" value={name}
                           onChange={event => setName(event.target.value)} placeholder="Name" autoComplete="off"/>
                </div>

                <div className="flexer">
                    <label className="label-form" htmlFor="surname">Your surname:</label>
                    <input className="input-form" type="text" id="surname" value={surname}
                           onChange={event => setSurname(event.target.value)} placeholder="Surname" autoComplete="off"/>
                </div>

                <div className="flexer">
                    <label className="label-form" htmlFor="email">Your email:</label>
                    <input className="input-form" type="email" id="age" value={mail}
                           onChange={event => setMail(event.target.value)} placeholder="Email" autoComplete="off"/>
                </div>

                <div className="flexer">
                    <label className="label-form" htmlFor="password">Your password:</label>
                    <input className="input-form" type="password" id="password" value={password}
                           onChange={event => setPassword(event.target.value)} placeholder="Password"/>
                </div>
                <h5 className="login-text">Do you have an account?
                    <Link style={{textDecoration: "none"}} to='/login'> Login</Link>
                </h5>
                <div className="button-form">
                    <button className="button-for" type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Registrate;