import React, { useEffect } from 'react';
import InvitationLogin from './InvitationLogin'
import useInvitationAuth from '../../hooks/useInvitationAuth';
import { useNavigate } from 'react-router-dom';

function Welcome() {
	const { invitation, isLoggedIn, logout, getInvitation } = useInvitationAuth();
	let navigate = useNavigate();

	// Update State
	useEffect(() => { getInvitation() }, [])

	const handleLogout = async (event) => { 
		event.preventDefault()
		try {
			let res = await logout();
			return navigate('/')
		} catch (e) {
			throw e
		}
	}

	return (
		<div>
			Welcome
			{!isLoggedIn() ?
				<InvitationLogin /> :
				<div>
					<div>Is Logged In</div>
					<button onClick={handleLogout}>Logout</button>
				</div>
			}
			{'Current: ' + JSON.stringify(invitation)}
		</div>
	);
}

export default Welcome;
