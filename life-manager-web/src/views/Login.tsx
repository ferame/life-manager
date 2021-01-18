import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectUser, setUser } from '../redux/reducers/userSlice';

export default function Login () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    let history = useHistory();
    const user = useSelector(selectUser);
    
    function handleSubmit (e:any) {
        e.preventDefault();
        Axios.post("/authenticate", {
            username: username,
            password: password
        })
        .then(response => {
            console.log("Response received");
            console.log(response);
            if(response.data && response.data.token) {
                dispatch(setUser({
                    username: username,
                    token: response.data.token
                }));
                history.push('/');
            }
            // TODO: remove this log
            console.log(user);
        })
        .catch(function (error) {
            if (error.response) {
                console.log("Authentication not successful");
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log("Error while performing the api call: '/authenticate'");
            }
            console.log(error);
        });
        console.log(username);
        console.log(password);
    }

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>
                <input
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
                    name="username"
                    type="text"
                    placeholder="Username"/>
                <input
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    name="password"
                    type="password"
                    placeholder="Password"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}