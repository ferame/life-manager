import React from 'react';
import { useState } from 'react';
// import { Counter } from '../features/counter/Counter';

export default function Register () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit (e:any) {
        e.preventDefault();
        console.log(username);
        console.log(password);
        console.log("Eh");
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
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}