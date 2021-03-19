import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders App', () => {
  const screenRender = render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  expect(screenRender.getByText(/News/i)).toBeInTheDocument();
  expect(screenRender.getByText(/register/i)).toBeInTheDocument();
});
