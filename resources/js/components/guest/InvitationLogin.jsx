import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useInvitationAuth from '../../hooks/useInvitationAuth';

function Login(props) {
	const { invitation, login, errors, setErrors, getInvitation } = useInvitationAuth();
	let navigate = useNavigate();

	// Update State
	useEffect(() => { getInvitation() }, [])

	const [code, setCode] = useState('');
	
	const handleInvitationSubmit = async (event) => {
		event.preventDefault();
		try {
			let res = await login(code);
			console.log('Invitation Logged in successfully');
			return navigate('/')
		} catch (e) {
			throw e
		}
	};

	return (
		<div className="w-full max-w-md">
			<form onSubmit={handleInvitationSubmit} className="bg-white border-2 rounded px-8 pt-6 pb-8">
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
						Logga in med din kod
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="code"
						type="text"
						placeholder="Kod"
						value={code}
						onChange={(e) => setCode(e.target.value)}
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Logga in med kod
					</button>
				</div>
				{errors?.code ? <div className="my-2 text-sm text-red-500">{errors?.code}</div> : null}
			</form>
		</div>
	);
};

export default Login;
