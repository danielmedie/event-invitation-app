import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [invitationCode, setInvitationCode] = useState('');

  const handleInputChange = (event) => {
    setInvitationCode(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Här kan du lägga till logiken för att kontrollera inbjudningskoden
    // Exempelvis göra en förfrågan till servern för att verifiera koden

    // Om koden är giltig, sätt isLoggedIn till true
    if (invitationCode === 'giltigKod') {
      setIsLoggedIn(true);
    } else {
      alert('Ogiltig inbjudningskod. Försök igen.');
    }
  };

  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/login">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card my-card">
                  <h1 className="my-title">Examensfest 2024</h1>
                  <div className="card-header my-card-header">Inbjudningskod</div>

                  <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                      <div className="form-group">
                        <label htmlFor="invitationCode" className="my-label">
                          Ange din inbjudningskod:
                        </label>
                        <input
                          type="text"
                          className="form-control my-input"
                          id="invitationCode"
                          value={invitationCode}
                          onChange={handleInputChange}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary my-button">
                        Öppna inbjudan
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
