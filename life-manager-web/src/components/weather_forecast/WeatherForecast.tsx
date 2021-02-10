import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateForecast, selectWeather } from '../../redux/reducers/weatherSlice';
import {selectUser} from '../../redux/reducers/userSlice';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../weather_forecast/WeatherForecast.style.scss';
import '../weather_forecast/WeatherIcons.style.scss';
import weatherConditions from '../weather_forecast/weatherConditions';

const locations = [
    'london',
    'vilnius',
    'kaunas'
];

const getWeatherIconName = (forecastId: string) => {
    return weatherConditions.find(entry => entry.id === parseInt(forecastId))?.icon ?? "sunny";
}

export default function WeatherForecast() {
    const user = useSelector(selectUser);
    const weather = useSelector(selectWeather);
    const [loc, setLoc] = useState<string>(weather.location);
    const dispatch = useDispatch();

    useEffect(() => {
        if(loc !== undefined){
            dispatch(updateForecast(user.token, loc));   
        }  
    }, [loc, user, dispatch])

    return (
        <div className="weather-component widget">
            <div className="weather-card">
                <div className="current-temp">
                    <span className="temp">{weather.temperature}&deg;</span>
                    <span className="location">{weather.location}</span>
                </div>
                <div className="current-weather">
                    <div className="conditions weatherIcon">
                        <div className={getWeatherIconName(weather?.id)}>
                            <div className="inner"/>
                        </div>
                    </div>
                    <div className="info">
                        <span className="rain-mm">{weather.rainfall} MM</span>
                        <span className="wind-speed">{weather.windspeed} M/s</span>
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