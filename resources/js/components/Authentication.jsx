import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { InviteRoutes } from '../api/active-invite-api';
import { LoginRoutes, UserRoutes } from '../api/admin-api';
import UserDashboard from './UserDashboard';
import { GuestRoutes } from '../api/active-invite-api';

function Authentication() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentAdminUser, setCurrentAdminUser] = useState([]);
  const [currentInvitation, setCurrentInvitation] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();

  const handleInvitationSubmit = async (event) => {
    event.preventDefault();
    console.log('Handling invitation submit');
    try {
      const { data } = await InviteRoutes.LoginInvite({ code });
      console.log('Invitation Code Valid', data.token);
      await getCurrentGuest();
      setIsLoggedIn(true);
      console.log('After setting isLoggedIn to true');
      redirectToUserDashboard();
    } catch (error) {
      console.error('Error during LoginInvite request:', error);
    }
  };

  const getCurrentGuest = async () => {
    try {
      const { data: guests } = await GuestRoutes.GetGuests({ invitation_code: code });
      const guest = guests.length > 0 ? guests[0] : null;
      setCurrentInvitation(guest);
      console.log('Current Invitation:', guest);
    } catch (error) {
      console.error('Error during GetGuests request:', error);
    }
  };

  const getCurrentInvitation = async () => {
    try {
      let { data: invitation } = await InviteRoutes.GetInvite();
      setCurrentInvitation(invitation);
      setIsLoggedIn(true);
      console.log('Current Invitation (GetInvite):', invitation);
    } catch (error) {
      console.error('Error during GetInvite request:', error);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    let res = await LoginRoutes.Login({ email, password });
    setCurrentAdminUser(res.data);
    console.log('User Logged in successfully');
    setIsLoggedIn(true);
  };

  const getCurrentAdminUser = async () => {
    try {
      let { data: user } = await UserRoutes.ShowUser();
      setCurrentAdminUser(user);
      console.log('Current Admin User:', user);
    } catch (error) {
      console.error('Error during ShowUser request:', error);
    }
  };

  useEffect(() => {
    const handleLoad = () => {
      getCurrentInvitation();
      getCurrentAdminUser();
    };
    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn && currentInvitation && currentInvitation.name) {
      console.log('Redirecting to UserDashboard:', currentInvitation.name);
      history.push('/UserDashboard', { userName: currentInvitation.name });
    }
  }, [isLoggedIn, currentInvitation, history]);

  const redirectToUserDashboard = () => {
    console.log('Inside redirectToUserDashboard');
    if (isLoggedIn && currentInvitation && currentInvitation.name) {
      console.log('Redirecting to UserDashboard:', currentInvitation.name);
      history.replace('/UserDashboard', { userName: currentInvitation.name });
    }
  };
  

  return (
    <div className="w-full max-w-md m-5">
      <form onSubmit={handleInvitationSubmit} className="bg-white border-2 rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
            Code
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="code"
            type="text"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login with Code
          </button>
        </div>
      </form>

      {isLoggedIn && currentInvitation && currentInvitation.name && (
        <Redirect to={{ pathname: '/UserDashboard', state: { userName: currentInvitation.name } }} />
      )}

      <form onSubmit={handleLoginSubmit} className="bg-white border-2 rounded px-8 pt-6 pb-8 mt-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login Admin
          </button>
        </div>
      </form>
      {currentAdminUser ? 'Current User: ' + JSON.stringify(currentAdminUser) : ''}
    </div>
  );
}

export default Authentication;
