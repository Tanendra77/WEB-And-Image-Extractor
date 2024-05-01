import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Index from './Pages/Index';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Index} />
      </Switch>
    </Router>
  );
};

export default App;
