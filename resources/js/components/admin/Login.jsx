import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import SimpleLayout from '../layouts/SimpleLayout'
import useAuth from '../../hooks/useAuth';

function Login(props) {
	const { getCurrentUser, login, errors, setErrors, getUser } = useAuth();
	let navigate = useNavigate();

	const [credentials, setCredentials] = useState({ email: '', password: '' });

	const user = getCurrentUser()

	// Update State
	useEffect(() => { getUser() }, [])

	// Watch user and redirect to admin if already logged in
	useEffect(() => {
		if (user?.id) {
			return navigate('/admin', { replace : true })
		}
	},[user])

	// Prefill
	// useEffect(() => {
	// 	setCredentials({ email: 'test@example.com', password: 'password' })
	// }, []);

	const handleLoginSubmit = async (event) => { 
		event.preventDefault()
		try {
			let res = await login(credentials.email, credentials.password);
			console.log('User Logged in successfully');
			return navigate('/admin', { replace : true })
		} catch (e) {
			throw e
		}
	}

	
	const updateCredentialsState = (e) => {
		setErrors([])
		setCredentials({ ...credentials, [e.target.name || e.target.id]: e.target.value });
	};

	return (
		<SimpleLayout>
			<div className="w-full max-w-md m-5">
				<h2>Admin inloggning</h2>

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
							value={credentials.email}
							onChange={updateCredentialsState}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
							Lösenord
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="Lösenord"
							value={credentials.password}
							onChange={updateCredentialsState}
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Logga in som admin
						</button>
					</div>
					{errors?.email ? <div className="my-2 text-sm text-red-500">{errors?.email}</div> : null}
				</form>
			</div>
		</SimpleLayout>
	);
};

export default Login;
