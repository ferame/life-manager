import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import userReducer, { User } from '../redux/reducers/userSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import TopBar from './TopBar';
import { MemoryRouter } from 'react-router-dom';

const renderComponent = (userState: User) => render(
    <Provider store={
        configureStore({
            reducer: {
                user: userReducer
            },
            middleware: [thunk, ...getDefaultMiddleware()],
            preloadedState: {
                user: userState
            }
        }
    )}>
        <MemoryRouter>
            <TopBar/>
        </MemoryRouter>
    </Provider>
);
  
test('renders title', () => {
    const screenRender = renderComponent({
        username: "",
        token: "",
        isAuthenticated: false
    });
    expect(screenRender.getByText(/News/i)).toBeInTheDocument();
})

test('correct buttons shown when unauthenticated', () => {
    const screenRender = renderComponent({
        username: "",
        token: "",
        isAuthenticated: false
    });
    expect(screenRender.getByTestId('login-button')).toBeInTheDocument();
    expect(screenRender.getByTestId('register-button')).toBeInTheDocument();
    expect(screenRender.getAllByRole('button')).toHaveLength(6);
});

test('correct buttons shown when Authenticated', () => {
    const screenRender = renderComponent({
        username: "TestUsername",
        token: "",
        isAuthenticated: true
    });
    expect(screenRender.queryByTestId('register-button')).not.toBeInTheDocument();
    expect(screenRender.queryByTestId('login-button')).not.toBeInTheDocument();
    expect(screenRender.getByText(/TestUsername/i)).toBeInTheDocument();
    expect(screenRender.getAllByRole('button')).toHaveLength(4);
});
