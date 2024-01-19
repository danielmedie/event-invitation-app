import React, { useEffect } from 'react';
import InvitationLogin from './InvitationLogin';
import useInvitationAuth from '../../hooks/useInvitationAuth';

function Welcome() {
	const { getCurrentInvitation, isLoggedIn, logout, getInvitation } = useInvitationAuth();
	let navigate = useNavigate();

	// Update State
	useEffect(() => { getInvitation() }, [])

	const invitation = getCurrentInvitation()

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      let res = await logout();
      return navigate('/');
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6">Welcome</h2>
        {isLoggedIn() ? (
          <>
			<p className="mb-4">Hello, {invitation && invitation.guest && invitation.guest.name}!</p>
            <button
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </>
        ) : (
          <InvitationLogin />
        )}
        {/* <div className="mt-4">Current: {JSON.stringify(invitation)}</div> */}
      </div>
    </div>
  );
}

export default Welcome;
