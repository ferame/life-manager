import * as React from 'react';
import { Location } from '../store/weather/types';

interface LocationListProps {
    locations: Location[];
}

const ChatHistory: React.SFC<LocationListProps> = ({ locations }) => {
    return (
        <div className='location-list'>
            {locations.map(location => (
                <div className='location-item' key={location.timestamp}>
                    <h3>From: {location.user}</h3>
                    <p>{location.location}</p>
                </div>
            ))}
        </div>
    );
};

export default ChatHistory;
