import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Authentication from './Authentication';
import UserDashboard from './UserDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/login">
            <Authentication setUserName={setUserName} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/UserDashboard">
            {isLoggedIn ? (
              <UserDashboard userName={userName} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
