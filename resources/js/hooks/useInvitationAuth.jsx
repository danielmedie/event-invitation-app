import React, { useState, useContext, createContext, useEffect } from "react"
import { InviteRoutes } from '../api/active-invite-api';
import { useLocation, useNavigate } from "react-router-dom";

const invitationAuthContext = createContext()

export const useInvitationAuthContext = () => { 
	return useContext(invitationAuthContext)
}

export const useInvitationAuth = () => { 
	return useInvitationAuthMethods()
}

export const getInvitationOnMount = () => { 
	const {getInvitation} = useInvitationAuthMethods()
	useEffect(() => {
		(async () => { await getInvitation() })()
	},[])
}

export function InvitationAuthWrapper({ children, protect = true }) {
	const authMethods = useInvitationAuthMethods()
	const { isLoggedIn } = authMethods

	if (!isLoggedIn) {
		getInvitationOnMount()
	}
	
	if (protect) {
		let location = useLocation();
		const origin = location.state?.from?.pathname || '/';
		let navigate = useNavigate();
	
		if (!isLoggedIn) {
			return useEffect(() => navigate('/welcome', { from : origin, replace: true } ))
		}
	}
	return <invitationAuthContext.Provider value={authMethods}>{children}</invitationAuthContext.Provider>
}

export function InvitationAuthProtected({ children }) {
	return <InvitationAuthWrapper protect={true} children={children} />
}

export function InvitationAuthPublic({ children }) {
	return <InvitationAuthWrapper protect={false} children={children} />
}

function useInvitationAuthMethods() {
	const [invitation, setInvitation ] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const [errors, setErrors] = useState([])
	
	async function login(code) {
		setErrors([])
		setIsLoading(true)
		try {
			let { data } = await InviteRoutes.LoginInvite({ code });
			api().setBearerToken(data.token)
			await getInvitation();
			console.log('Invitation Code Valid', data.token);
			return res
		}
		catch (error) {
			setErrors(error.errors)
			console.error('Invitation could not be logged in', error);
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
			return true;
		} catch (error) {
			setErrors(error.errors)
			console.error('Invitation could not be logged out.', error);
			throw error;
		} finally {
			setIsLoading(false)
		}
	}
	
	async function getInvitation() {
		try {
			let { data: invitation } = await InviteRoutes.GetInvite();
			setInvitation(invitation);
			console.log('Current Invitation:', invitation);
			return invitation
		} catch (error) { }
	}

	return {
		invitation,
		login,
		logout,
		getInvitation,
		isLoggedIn : !!invitation,
		errors,
		isLoading
	}
}

export default useInvitationAuthMethods