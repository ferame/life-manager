import React from 'react';
import WeatherForecast from 'components/weather_forecast/WeatherForecast';
import '../home/Home.style.scss';

export default function Home () {
    return (
        <div className="widgets-grid">
            <WeatherForecast/>
            {/* <WeatherForecast/>
            <WeatherForecast/>
            <WeatherForecast/>
            <WeatherForecast/> */}
        </div>
    )
}