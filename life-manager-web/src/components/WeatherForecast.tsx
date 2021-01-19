import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/userSlice';
import { setLocation, setTemperature } from '../redux/reducers/weatherSlice';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Axios from 'axios';

const locations = [
    'london',
    'vilnius'
];

export default function WeatherForecast() {
    const user = useSelector(selectUser);
    const [location, setLoc] = useState("");
    const [temperature, setTemp] = useState("");
    const dispatch = useDispatch();

    // TODO data fetching should be done as part of the redux action
    useEffect(() => {
        Axios.get('api/weather/current/' + location, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(response => {
            setTemp(response.data.main.temp);
            dispatch(setTemperature(response.data.main.temp));
            dispatch(setLocation(location));
        });     
    }, [user, location, dispatch])

    return (
        <div>
            <div><b>Weather Forecast</b></div>
            <div>Temperature: {temperature}</div>
            <Autocomplete
                id="location-selector"
                value={location}
                onChange={(event: any, newLocation: string | null) => {
                    setLoc(newLocation === null ? "" : newLocation);
                }}
                options={locations}
                getOptionLabel={(option) => option.toUpperCase()}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="location selector" variant="outlined" />}
            />
        </div>
    );
}