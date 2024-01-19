import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Admin(props) {
	const { user } = useAuth();

	const style = ({ isActive }) => ({
		fontWeight: isActive ? 'bold' : 'normal',
	});

	return (
		<div id="admin-app" className="app-page">
			<h1>Admin</h1>

			{isLoggedIn ? (<div>Is Logged In</div>) : null}
			
			<div>
				{/* Admin Navigation */}
				<nav
					style={{
						borderBottom: 'solid 1px',
						paddingBottom: '1rem',
					}}
					>
					<div className='flex'>
						<NavLink to="/admin/event" className='mx-auto' style={style}>View the Event</NavLink>
						<NavLink to="/admin/guests" className='mx-auto' style={style}>Guests</NavLink>
						<NavLink to="/admin/invitations" className='mx-auto' style={style}>Invitations</NavLink>
					</div>
				</nav>
			</div>

			<main id="content" style={{ padding: '1rem 0' }}>
				<div id="content-inner">
					<Outlet />
				</div>
			</main>

		</div>
	);
}

export default Admin;
