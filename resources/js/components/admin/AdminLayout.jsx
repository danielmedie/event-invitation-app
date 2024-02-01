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
			<div>
				<nav className="border-b py-2">
					<div className='flex'>
						<NavLink to="/admin" className='mx-auto'>Dashboard</NavLink>
						<NavLink to="/admin/event" className='mx-auto'>Event</NavLink>
						<NavLink to="/admin/guests" className='mx-auto'>Gäster</NavLink>
						<button
							onClick={handleLogout}
							className="mx-auto text-red-500 text:bg-red-700 font-bold focus:outline-none focus:shadow-outline"
							>
							Logga ut
						</button>
					</div>
				</nav>
			</div>

			<main id="content" className="p-4">
				<div id="content-inner">
					<Outlet />
				</div>
			</main>

		</div>
	);
}

export default Admin;
