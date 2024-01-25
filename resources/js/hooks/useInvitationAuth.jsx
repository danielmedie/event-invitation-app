import { useEffect, useState } from "react"
import { InviteRoutes } from '../api/active-invite-api';
import { redirect } from "react-router-dom";

export const invitationAuthCheckRouteLoader = async () => {
	try {
		let { data } = await InviteRoutes.GetInvite()
		if (!data) {
			return redirect('/welcome')
		 }
		 return null
	} catch (error) {
		return redirect('/welcome')
	}
	
}

export const useInvitationAuth = () => { 
	const [invitation, setInvitation ] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const [errors, setErrors] = useState([])
	
	async function login(code) {
		setErrors([])
		setIsLoading(true)
		try {
			let { data } = await InviteRoutes.LoginInvite({ code });
			api().setBearerToken(data.token)
			let loggedIn = await getInvitation();
			return loggedIn
		}
		catch (error) {
			setErrors(error.response?.data?.errors)
			throw error;
		} finally {
			setIsLoading(false)
		}
	}

	async function logout() {
		setErrors([])
		setIsLoading(true)
		try {
			await InviteRoutes.LogoutInvite()
			api().deleteBearerToken()
			setInvitation(null);
			return true;
		} catch (error) {
			setErrors(error.response?.data?.errors)
			throw error;
		} finally {
			setIsLoading(false)
		}
	}
	
	async function getInvitation() {
		try {
			let { data } = await InviteRoutes.GetInvite();
			setInvitation(data);
			return data
		} catch (error) { }
	}

	function isLoggedIn() {
		return !!invitation
	}

	function getCurrentInvitation() {
		return invitation
	}

	return {
		setInvitation,
		login,
		logout,
		getInvitation,
		getCurrentInvitation,
		isLoggedIn,
		errors,
		setErrors,
		isLoading,
		setIsLoading
	}
}

export default useInvitationAuth