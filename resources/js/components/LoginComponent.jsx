import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginComponent = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', credentials);
      // Om inloggningen lyckades och du har en token eller session, omdirigera till adminsidan
      if (response.data.token) {
        history.push('/admin'); // Omdirigera till adminsidan efter inloggning
      }
    } catch (error) {
      console.error(error);
      // Visa felmeddelande eller gör något annat om inloggningen misslyckas
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginComponent;
