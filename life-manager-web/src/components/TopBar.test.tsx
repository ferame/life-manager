import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
    expect(screenRender.queryByTestId('user-menu-button')).toBeInTheDocument();
    expect(screenRender.getAllByRole('button')).toHaveLength(4);
});

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

test('navigation buttons are working correctly', () => {
    const screenRender = renderComponent({
        username: "",
        token: "",
        isAuthenticated: false
    });
    fireEvent.click(screenRender.getByText(/Home/i));
    expect(mockHistoryPush).toBeCalledWith('/');

    fireEvent.click(screenRender.getByText(/Contact/i));
    expect(mockHistoryPush).toBeCalledWith('/contact');

    fireEvent.click(screenRender.getByText(/About/i));
    expect(mockHistoryPush).toBeCalledWith('/about');
})

test('history hooks for unauthenticated buttons are working correctly', () => {
    const screenRender = renderComponent({
        username: "",
        token: "",
        isAuthenticated: false
    });
    fireEvent.click(screenRender.getByTestId('login-button'));
    expect(mockHistoryPush).toBeCalledWith('/login');

    fireEvent.click(screenRender.getByTestId('register-button'));
    expect(mockHistoryPush).toBeCalledWith('/register');
})
