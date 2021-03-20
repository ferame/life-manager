import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import userReducer, { User } from '../redux/reducers/userSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import TopBar from './TopBar';

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
        <TopBar/>
    </Provider>
);
  
test('renders react link for registration when unauthenticated', () => {
    const screenRender = renderComponent({
        username: "",
        token: "",
        isAuthenticated: false
    });
    expect(screenRender.getByTestId('register-button')).toBeInTheDocument();
});

test('renders react link for login when unauthenticated', () => {
    const screenRender = renderComponent({
        username: "",
        token: "",
        isAuthenticated: false
    });
    expect(screenRender.getByTestId('login-button')).toBeInTheDocument();
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
});
