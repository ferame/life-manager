import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/reducers/userSlice';
import { setLocation, setTemperature, selectWeather } from '../../redux/reducers/weatherSlice';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Axios from 'axios';
import '../weather_forecast/WeatherForecast.style.scss';
import '../weather_forecast/WeatherIcons.style.scss';

const locations = [
    'london',
    'vilnius'
];

export default function WeatherForecast() {
    const user = useSelector(selectUser);
    const weather = useSelector(selectWeather);
    const [loc, setLoc] = useState<string>(weather.location);
    const [temperature, setTemp] = useState<number>(weather.temperature);
    const dispatch = useDispatch();

    // TODO data fetching should be done as part of the redux action
    useEffect(() => {
        Axios.get('api/weather/current/' + loc, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(response => {
            setTemp(response.data.main.temp);
            dispatch(setTemperature(response.data.main.temp));
            dispatch(setLocation(loc));
        });     
    }, [user, loc, dispatch])

    return (
        <div className="weather-component widget">
            <div className="weather-card">
                <div className="current-temp">
                    <span className="temp">{temperature}&deg;</span>
                    <span className="location">{weather.location}</span>
                </div>
                <div className="current-weather">
                    <div className="conditions weatherIcon">
                        <div className="sunny">
                            <div className="inner"/>
                        </div>
                    </div>
                    <div className="info">
                        <span className="rain-mm">1.3 MM</span>
                        <span className="wind-speed">10 M/s</span>
                    </div>
                </div>
            </div>
            <Autocomplete
                value={loc}
                onChange={(event: any, newLocation: string | null) => {
                    setLoc(newLocation === null ? "" : newLocation);
                }}
                options={locations}
                getOptionLabel={(option) => option.toUpperCase()}
                renderInput={(params) => <TextField {...params} label="location selector" variant="outlined" />}
            />
        </div>
    );
}