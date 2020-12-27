import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/userSlice';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@material-ui/core';

interface Course {
    id: number;
    username: string;
    description: string;
}

export default function Home () {
    const user = useSelector(selectUser);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      const fetchCourses = async () => {
        const result = await axios.get('instructors/' + user.username + '/courses/assigned', {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        setCourses(result.data);
      };
   
      fetchCourses();
    }, [user]);

    console.log(user);
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