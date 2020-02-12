import React from 'react';
import styled from 'styled-components';

// Redux based on https://codesandbox.io/s/w02m7jm3q7
import { connect } from 'react-redux';
import { AppState } from './store';
import { SystemState } from './store/system/types';
import { updateSession } from './store/system/actions';

const Title = styled.h1`
    color: #292727;
    text-align: center;
`;

interface AppProps {
    updateSession: typeof updateSession;
    system: SystemState;
  }

export type UpdateLocationParam = React.SyntheticEvent<{ value: string }>;

class App extends React.Component<AppProps> {
    componentDidMount() {
        this.props.updateSession({
            loggedIn: true,
            session: 'default_session',
            userName: 'defaultName'
        });
    }

    updateMessage = (event: UpdateLocationParam) => {
        this.setState({ message: event.currentTarget.value });
    };

    render() {
        return (
            <div>
                <Title data-testid='app-title' >Life Manager</Title>
                <p>Username: {this.props.system.userName}</p>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system
});

export default connect(
    mapStateToProps,
    {updateSession}
)(App);