import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import TopBar from './components/TopBar';
import Home from './views/Home';
import Contact from './views/Contact';
import About from './views/About';
import Register from './views/Register';
import Login from './views/Login';

export default function App() {
  return (
    <div className="App">
      <TopBar/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/about' component={About} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
}