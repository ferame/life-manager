import React from 'react';
import { useState } from 'react';
import axios from "axios";
// import { Counter } from '../features/counter/Counter';

export default function Register () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function handleSubmit (e:any) {
        e.preventDefault();
        axios.post("/register", {
            username: username,
            password: password,
            matchingPassword: password,
            email: email
        })
        .then((response) => {
            console.log("Response received");
            console.log(response);
        })
        .catch((error) => {
            console.log("Error while performing the api call: '/register'");
            console.log(error);
        })
        console.log(username);
        console.log(password);
    }
    // return <Counter/>;
    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <h3>Register</h3>
                <input onChange={(event) => setUsername(event.target.value)}
                       value={username}
                       name="username"
                       type="text"
                       placeholder="Username"/>
                <input onChange={(event) => setPassword(event.target.value)}
                       value={password}
                       name="password"
                       type="password"
                       placeholder="Password"/>
                <input onChange={(event) => setEmail(event.target.value)}
                       value={email}
                       name="email"
                       type="text"
                       placeholder="Email"/>
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}