import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
import { setUser } from '../redux/reducers/userSlice';

export default function Login () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    
    function handleSubmit (e:any) {
        e.preventDefault();
        axios.post("/authenticate", {
            username: username,
            password: password
        })
        .then((response) => {
            console.log("Response received");
            console.log(response);
            dispatch(setUser({
                username: username,
                token: response.data.token
            }));
        })
        .catch((error) => {
            console.log("Error while performing the api call: '/register'");
            console.log(error);
        })
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