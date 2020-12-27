import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/userSlice';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@material-ui/core';

interface User {
    username: string;
    token: string;
}

interface Course {
    id: number;
    username: string;
    description: string;
}

function getCourses(user: User) {
    // profileAxios.interceptors.request.use(config => {
    //     const token = user.token;
    //     config.headers.Authorization = `Bearer ${token}`;
    //     return config;
    // })
    return axios.get('instructors/' + user.username + '/courses/assigned', {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })
    .then(response => response.data)
    .catch(err => console.log(`Authentication error ${err}`));
}

export default function Home () {
    const user = useSelector(selectUser);
    console.log(user);
    const [courses, setCourses] = useState([]);
    getCourses(user);
    console.log(`Returned courses ${courses}`);
    return (
        <div>
            <h2>Current User</h2>
            <div>Username: {user.username}</div>
            <div>Token: {user.token}</div>
            <div>
                <List>
                    {courses.map(function(item: Course, index: number){
                        return (
                        <ListItem>
                            <ListItemText primary={item.description}/>
                        </ListItem>)
                    })}
                </List>
            </div>
        </div>
    )
}