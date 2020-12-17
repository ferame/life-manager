import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import TopBar from './components/TopBar';
import Home from './components/views/Home';
import Contact from './components/views/Contact';
import About from './components/views/About';

export default function App() {
  return (
    <div className="App">
      <TopBar/>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/contact' component={Contact} />
          <Route path='/about' component={About} />
        </Switch>
      </Router>
    </div>
  );
}