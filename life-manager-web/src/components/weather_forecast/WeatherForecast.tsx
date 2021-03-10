import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateForecast, selectWeather } from '../../redux/reducers/weatherSlice';
import {selectUser} from '../../redux/reducers/userSlice';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import '../weather_forecast/WeatherForecast.style.scss';
import '../weather_forecast/utils/WeatherIcons.style.scss';
import weatherConditions from './utils/weatherConditions';
import { selectLocations, updateLocations } from 'redux/reducers/locationsSlice';
import { changeLocation, selectUserOptions } from 'redux/reducers/userOptionsSlice';

interface Location {
    city: string;
    country: string;
}

const getWeatherIconName = (forecastId: string) => {
    return weatherConditions.find(entry => entry.id === parseInt(forecastId))?.icon ?? "sunny";
}

export default function WeatherForecast() {
    const user = useSelector(selectUser);
    const weather = useSelector(selectWeather);
    const locations = useSelector(selectLocations);
    const locationOption = useSelector(selectUserOptions).location;
    
    const [location, setLocation] = useState<Location>(locationOption);

    const dispatch = useDispatch();

    useEffect(() => {
        if(user.token.length !== 0 && locations.length === 0){
            dispatch(updateLocations(user.token));
            console.log("Getting locations");
        }
    }, [dispatch, user.token, locations]);

    useEffect(() => {
        if(location?.city !== undefined && location?.country !== undefined) {
            dispatch(updateForecast(user.token, location));
            dispatch(changeLocation(location));
        }  
    }, [location, user, dispatch])

    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        limit: 20,
        stringify: (option: Location) => `${option.city}, ${option.country}`
    })

    return (
        <div className="weather-component widget">
            <div className="weather-card">
                <div className="current-temp">
                    <span className="temp">{weather.temperature}&deg;</span>
                    <span className="location">{weather.location.city}</span>
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
                value={location}
                onChange={(event: any, newLocation: Location | null) => {
                    newLocation ? setLocation(newLocation) : console.log("Null location");
                }}
                options={locations}
                filterOptions={filterOptions}
                getOptionLabel={(option) => option.city !== "" && option.country !== "" ? `${option.city}, ${option.country}` : ''}
                renderInput={(params) => <TextField {...params} label="location selector" variant="outlined" />}
            />
        </div>
    );
}