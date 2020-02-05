import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('AppTest', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Checks the App title', () => {
        const {getByTestId} = render(<App />);
        const title = getByTestId('app-title').innerHTML;
        expect(title).toBe('Life Manager');
    });
});