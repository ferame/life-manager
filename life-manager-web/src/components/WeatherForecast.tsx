import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/userSlice';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Axios from 'axios';

const locations = [
    'london',
    'vilnius'
];

export default function WeatherForecast() {
    const user = useSelector(selectUser);
    const [location, setLocation] = useState("");
    const [temperature, setTemperature] = useState("");
    const dispatch = useDispatch();

    // TODO data fetching should be done as part of the redux action
    useEffect(() => {
        Axios.get('api/weather/current/' + location, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(response => setTemperature(response.data.main.temp));     
    }, [user, location])

    return (
        <div>
            <div><b>Weather Forecast</b></div>
            <div>Temperature: {temperature}</div>
            <Autocomplete
                id="location-selector"
                value={location}
                onChange={(event: any, newLocation: string | null) => {
                    setLocation(newLocation === null ? "" : newLocation);
                }}
                options={locations}
                getOptionLabel={(option) => option.toUpperCase()}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="location selector" variant="outlined" />}
            />
        </div>
    );
}