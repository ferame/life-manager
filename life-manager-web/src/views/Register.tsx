import React from 'react';

export default function Register (props) {
    return (
        <div className="form-wrapper">
            <form onSubmit={props.handleSubmit}>
                <h3>Register</h3>
                <input onChange={props.handleChange}
                       value={props.username}
                       name="username"
                       type="text"
                       placeholder="Username"/>
                <input onChange={props.handleChange}
                       value={props.password}
                       name="password"
                       type="password"
                       placeholder="Password"/>
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}