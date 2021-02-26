import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import './App.style.scss';
import TopBar from './components/TopBar';
import Home from './views/home/Home';
import Contact from './views/Contact';
import About from './views/About';
import Register from './views/Register';
import Login from './views/Login';
import ProtectedRoute from 'router/ProtectedRoute';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/reducers/userSlice';

export default function App() {
  const user = useSelector(selectUser);
  let isAuthenticated = user.token.length > 0;
  return (
    <div className="App">
      <TopBar/>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <ProtectedRoute isAuthenticated={isAuthenticated} path='/contact' component={Contact} exact={true} />
        <ProtectedRoute isAuthenticated={isAuthenticated} path='/about' component={About} exact={true} />
        <ProtectedRoute isAuthenticated={isAuthenticated} path='/' component={Home} exact={true} />
      </Switch>
    </div>
  );
}