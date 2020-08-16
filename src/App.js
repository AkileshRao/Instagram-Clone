import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Main from './components/main/Main';

function App() {
  return (
    <div className="App">
      <Router>
        <Redirect path='/' exact to='/auth'></Redirect>
        <Route path='/auth' component={Auth}></Route>
        <Route path='/main' component={Main}></Route>
      </Router>
    </div>
  );
}

export default App;
