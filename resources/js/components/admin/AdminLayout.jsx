import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Admin(props) {
	const { isLoggedIn, logout, getUser } = useAuth();
	let navigate = useNavigate();

	// Update the state
	useEffect(() => { getUser() }, [])
	
	const handleLogout = async (event) => { 
		event.preventDefault()
		try {
			let res = await logout();
			return navigate('/login', { replace : true })
		} catch (e) {
			throw e
		}
	}

	return (
		<div id="admin-app" className="app-page">
			<h1>Admin</h1>

			{isLoggedIn() ? (<div>Is Logged In</div>) : null}

			<button onClick={handleLogout}>Logout</button>
			
			<div>
				<nav
					style={{
						borderBottom: 'solid 1px',
						paddingBottom: '1rem',
					}}
					>
					<div className='flex'>
						<NavLink to="/admin" className='mx-auto'>Dashboard</NavLink>
						<NavLink to="/admin/event" className='mx-auto'>View the Event</NavLink>
						<NavLink to="/admin/guests" className='mx-auto'>Guests</NavLink>
						{/* <NavLink to="/admin/invitations" className='mx-auto'>Invitations</NavLink> */}
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
