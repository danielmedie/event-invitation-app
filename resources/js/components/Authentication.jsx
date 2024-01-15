import React, { useState, useEffect } from 'react';
import { InviteRoutes } from '../api/active-invite-api';
import { LoginRoutes, UserRoutes } from '../api/admin-api';

function App() {
	const [code, setCode] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [currentAdminUser, setCurrentAdminUser] = useState([]);
	const [currentInvitation, setCurrentInvitation] = useState([]);

	const handleInvitationSubmit = async (event) => {
		event.preventDefault();
		let { data } = await InviteRoutes.LoginInvite({ code })
		api().setBearerToken(data.token)
		console.log('Invitation Code Valid', data.token)
		await getCurrentInvitation()
	}

	const getCurrentInvitation = async () => {
		let { data: invitation } = await InviteRoutes.GetInvite()
		setCurrentInvitation(invitation)
	}
	
	const handleLoginSubmit = async (event) => {
		event.preventDefault();
		let res = await LoginRoutes.Login({ email, password })
		setCurrentAdminUser(res.data)
		console.log('User Logged in successfully')
	}
	
	const getCurrentAdminUser = async () => {
		let { data: user } = await UserRoutes.ShowUser()
		setCurrentAdminUser(user)
	}

	useEffect(() => {
		const handleLoad = () => {
			getCurrentInvitation()
			getCurrentAdminUser()
		};
		window.addEventListener('load', handleLoad);
		return () => { window.removeEventListener('load', handleLoad); };
	  }, []);

	return (
		<div className="w-full max-w-md m-5">

			<form onSubmit={handleInvitationSubmit} className="bg-white border-2 rounded px-8 pt-6 pb-8">
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">Code</label>
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
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login with Code</button>
				</div>
			</form>
			{currentInvitation ? 'Current Invitation: '+JSON.stringify(currentInvitation) : ''}
			
			<form onSubmit={handleLoginSubmit} className="bg-white border-2 rounded px-8 pt-6 pb-8 mt-4">
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
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
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
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
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login Admin</button>
				</div>
			</form>
			{currentAdminUser ? 'Current User: '+JSON.stringify(currentAdminUser) : ''}
		</div>
	);
}

export default App;