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
// import { useSelector } from 'react-redux';
// import { selectUser } from 'redux/reducers/userSlice';

export default function App() {
  // const user = useSelector(selectUser);
  // let isAuthenticated = false;
  return (
    <div className="App">
      <TopBar/>
      <Switch>
        <ProtectedRoute path='/' component={Home} exact={false} />
        <ProtectedRoute path='/contact' component={Contact} exact={true} />
        <ProtectedRoute path='/about' component={About} exact={true} />
        {/* <Route exact path='/' component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/about' component={About} /> */}
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
}