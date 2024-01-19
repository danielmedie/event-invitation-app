import React, { useState, useContext, createContext, useEffect } from "react"
import { LoginRoutes, UserRoutes } from '../api/admin-api';
import { useLocation, useNavigate } from "react-router-dom";

const authContext = createContext()

export const useAuthContext = () => { 
	return useContext(invitationAuthContext)
}

export const useAuth = () => { 
	return useAuthMethods()
}

export const getUserOnMount = () => { 
	const {getUser} = useAuthMethods()
	useEffect(() => {
		(async () => { await getUser() })()
	}, [])
}

export function AuthWrapper({ children, protect = true }) {
	const authMethods = useAuthMethods()
	const { isLoggedIn } = authMethods

	if (!isLoggedIn) {
		getUserOnMount()
	}
	
	if (protect) {
		let location = useLocation();
		const origin = location.state?.from?.pathname || '/';
		let navigate = useNavigate();
	
		if (!isLoggedIn) {
			return useEffect(() => navigate('/login', { from : origin, replace: true } ))
		}
	}
	return <authContext.Provider value={authMethods}>{children}</authContext.Provider>
}

export function AuthProtected({ children }) {
	return <AuthWrapper protect={true} children={children} />
}

export function AuthPublic({ children }) {
	return <AuthWrapper protect={false} children={children} />
}


function useAuthMethods() {
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const [errors, setErrors] = useState([])

	async function login(email, password) {
		setErrors([])
		setIsLoading(true)
		try {
			let { data: user } = await LoginRoutes.Login({ email, password })
			setUser(user);
			console.log('User Logged in successfully');
			return res
		}
		catch (error) {
			setErrors(error.errors)
			console.error('Could not be logged in', error);
			throw error;
		} finally {
			setIsLoading(false)
		}
	}

	async function logout() {
		setErrors([])
		setIsLoading(true)
		try {
			await LoginRoutes.Logout();
			return true;
		}
		catch (error) {
			setErrors(error.errors)
			console.error('User could not be logged out.', error);
			throw error;
		} finally {
			setIsLoading(false)
		}
	}

	async function getUser() {
		try {
			let { data: user } = await UserRoutes.ShowUser()
			setUser(user);
			console.log('Current Admin User:', user);
			return data
		} catch (error) { }
	}

	return {
		user,
		login,
		logout,
		getUser,
		isLoggedIn: !!user,
		errors,
		isLoading
	}
}

export default useAuth