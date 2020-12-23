import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/userSlice';

export default function Home () {
    const user = useSelector(selectUser);
    console.log(user);
    return (
        <div>
            <h2>Current User</h2>
            <div>Username: {user.username}</div>
            <div>Token: {user.token}</div>
        </div>
    )
}