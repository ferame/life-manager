import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <Router>
      <Route path='/:filter?' component= {App} />
    </Router>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));