import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import userReducer, { User } from '../redux/reducers/userSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

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
        <App/>
        </MemoryRouter>
    </Provider>
);
  
test('renders react link for registration', () => {
    const screenRender = renderComponent({
        username: "",
        token: "",
        isAuthenticated: false
    });
    expect(screenRender.getByText(/register/i)).toBeInTheDocument();
});