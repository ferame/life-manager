import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateForecast, selectWeather } from '../../redux/reducers/weatherSlice';
import {selectUser} from '../../redux/reducers/userSlice';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../weather_forecast/WeatherForecast.style.scss';
import '../weather_forecast/WeatherIcons.style.scss';
import weatherConditions from '../weather_forecast/weatherConditions';
import { selectLocations, updateLocations } from 'redux/reducers/locationsSlice';
import { bestLocationMatches } from 'features/location/locationMatcher';

const locations = [
    '',
    'london',
    'vilnius',
    'kaunas'
];

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
    const [loc, setLoc] = useState<string>(weather.location);
    const reduxLocations = useSelector(selectLocations);
    const [matchedLocations, setMatchedLocations] = useState(Array<Location>());
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if(loc !== undefined) {
            dispatch(updateForecast(user.token, loc));   
        }  
    }, [loc, user, dispatch])

    useEffect(() => {
        if(searchText.trim().length > 0) {
            setMatchedLocations(bestLocationMatches(5, searchText, reduxLocations));
        } else {
            console.log("hello");
        }
    }, [searchText, setMatchedLocations])

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
            <button 
                onClick={() => dispatch(updateLocations(user.token))}
            >
                Get locations
            </button>
            <form>
                <label>
                    Location search:
                    <input type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
            <div>
                {matchedLocations.map((entry, index) => (
                    <p key={index}>{entry.city}</p>
                ))}
            </div>
        </div>
    );
}