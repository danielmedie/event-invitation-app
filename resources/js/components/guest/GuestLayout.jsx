import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function guest() {
	const style = ({ isActive }) => ({
		fontWeight: isActive ? 'bold' : 'normal',
	});

	return (
		<div id="guest-app" className="app-page">
			<div className="app-topbar">
				<div>Active Invite Actions</div>
			</div>

			<div>
				{/* Guest Navigation */}
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
			</div>

			<main id="content" style={{ padding: '1rem 0' }}>
				<div id="content-inner">
					<Outlet />
				</div>
			</main>

		</div>
	);
}

export default guest;