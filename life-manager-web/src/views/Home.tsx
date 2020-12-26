import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/userSlice';
import axios from 'axios';

interface User {
    username: string;
    token: string;
}

function getCourses(user: User) {
    // profileAxios.interceptors.request.use(config => {
    //     const token = user.token;
    //     config.headers.Authorization = `Bearer ${token}`;
    //     return config;
    // })
    axios.get('instructors/' + user.username + '/courses/assigned', {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })
    .then(response => {
        console.log('Response received');
        console.log(response.data);
        return response.data;
    })
    .catch(err => console.log(`Authentication error ${err}`));
}

export default function Home () {
    const user = useSelector(selectUser);
    console.log(user);
    let courses = getCourses(user);
    console.log(`Returned courses ${courses}`);
    return (
        <div>
            <h2>Current User</h2>
            <div>Username: {user.username}</div>
            <div>Token: {user.token}</div>
        </div>
    )
}