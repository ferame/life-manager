import React from 'react';
import styled from 'styled-components';

// Redux based on https://codesandbox.io/s/w02m7jm3q7
import { connect } from 'react-redux';
import { AppState } from './store/configureStore';

import { SystemState } from './store/system/types';
import { updateSession } from './store/system/actions';

import { WeatherState } from './store/weather/types';
import { addLocation } from './store/weather/actions';

import WeatherForecast from './components/WeatherForecast';
import LocationList from './components/LocationList';

import { thunkAddLocation } from './store/thunks/thunks';

const Title = styled.h1`
    color: #292727;
    text-align: center;
`;

interface AppProps {
    addLocation: typeof addLocation;
    updateSession: typeof updateSession;
    weather: WeatherState;
    system: SystemState;
    thunkAddLocation: any;
  }

export type UpdateLocationParam = React.SyntheticEvent<{ value: string }>;

class App extends React.Component<AppProps> {
    state = {
        location: ''
    };

    componentDidMount() {
        this.props.updateSession({
            loggedIn: true,
            session: 'default_session',
            userName: 'defaultName'
        });
        this.props.thunkAddLocation('Please add locations!');
    }

    updateLocation = (event: UpdateLocationParam) => {
        this.setState({ location: event.currentTarget.value });
    }

    addLocation = (location: string) => {
        this.props.addLocation({
            user: this.props.system.userName,
            location: location,
            timestamp: new Date().getTime()
          });
          this.setState({ location: '' });
    }

    render() {
        return (
            <div>
                <Title data-testid='app-title' >Life Manager</Title>
                <p>Username: {this.props.system.userName}</p>
                <LocationList locations={this.props.weather.locations} />
                <WeatherForecast
                    userName={this.props.system.userName}
                    location={this.state.location}
                    updateLocation={this.updateLocation}
                    addLocation={this.addLocation}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system,
    weather: state.weather
});

export default connect(
    mapStateToProps,
    { addLocation, updateSession, thunkAddLocation }
)(App);