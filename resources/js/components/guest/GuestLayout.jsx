import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useInvitationAuth } from '../../hooks/useInvitationAuth';

function guest(props) {
	const { invitation, isLoggedIn, getInvitation } = useInvitationAuth();
	let navigate = useNavigate();

	// Update the state
	useEffect(() => { getInvitation() }, [])

	const style = ({ isActive }) => ({
		fontWeight: isActive ? 'bold' : 'normal',
	});

	return (
		<div id="guest-app" className="app-page">
			
			{isLoggedIn() ?
				(<div className="app-topbar">
					<div>{invitation?.code || 'Active Invite'}</div>
				</div>) :
				null
			}

			{isLoggedIn() ? <div>
				<nav
					style={{
						borderBottom: 'solid 1px',
						paddingBottom: '1rem',
					}}
				>
					<div className='flex'>
						<NavLink to="/welcome" className='mx-auto' style={style}>Welcome</NavLink>
						<NavLink to="/rsvp" className='mx-auto' style={style}>RSVP</NavLink>
						<NavLink to="/event" className='mx-auto' style={style}>Event</NavLink>
					</div>
				</nav>
			</div> : null}

			<main id="content" style={{ padding: '1rem 0' }}>
				<div id="content-inner">
					<Outlet />
				</div>
			</main>

		</div>
	);
}

export default guest;