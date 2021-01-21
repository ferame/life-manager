import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/userSlice';

export default function About() {
    const user = useSelector(selectUser);
    return (
        <div>
            <h2>About</h2>
            <div>
                <h2>Current User</h2>
                <div>Username: {user.username}</div>
                <div>Token: {user.token}</div>
            </div>
        </div>
    );
}
