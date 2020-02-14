import * as React from 'react';
import { UpdateLocationParam } from '../App';

interface WeatherForcastProps {
  location: string;
  userName: string;
  addLocation: (location: string) => void;
  updateLocation: (event: UpdateLocationParam) => void;
}

const WeatherForecast: React.SFC<WeatherForcastProps> = ({
  userName,
  location,
  addLocation,
  updateLocation
}) => {
  function keyPress(e: React.KeyboardEvent<any>) {
    if (e.key === 'Enter') {
      send();
    }
  }

  function send() {
    addLocation(location);
  }

  return (
    <div className='location-interface'>
      <h3>User: {userName} </h3>
      <input
        value={location}
        onChange={updateLocation}
        onKeyPress={keyPress}
        className='location-input'
        placeholder='Type a message...'
      />
      <button onClick={send}>Add</button>
    </div>
  );
};

export default WeatherForecast;
