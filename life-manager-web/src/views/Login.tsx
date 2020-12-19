import React from 'react';

interface LoginProps {
    handleSubmit: (event: any) => void,
    handleChange: (event: any) => void,
    username: string,
    password: string
}

export default function Login (props: LoginProps) {
    return (
        <div className="form-wrapper">
            <form onSubmit={props.handleSubmit}>
                <h3>Login</h3>
                <input
                    onChange={props.handleChange}
                    value={props.username}
                    name="username"
                    type="text"
                    placeholder="Username"/>
                <input
                    onChange={props.handleChange}
                    value={props.password}
                    name="password"
                    type="password"
                    placeholder="Password"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}