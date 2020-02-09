import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    color: #292727;
    text-align: center;
`;

class App extends React.PureComponent {
    render() {
        return (
            <div>
                <Title data-testid='app-title' >Life Manager</Title>
            </div>
        );
    }
}

export default App;