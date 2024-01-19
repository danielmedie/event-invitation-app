import { useState } from "react"
import { LoginRoutes, UserRoutes } from '../api/admin-api';
import { redirect } from "react-router-dom";

export const authCheckRouteLoader = async () => {
	try {
		let { data } = await UserRoutes.ShowUser()
		return data
	} catch (error) {
		return redirect('/login')
	}
}

export const useAuth = () => {
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const [errors, setErrors] = useState([])

	async function login(email, password) {
		setErrors([])
		setIsLoading(true)
		try {
			let { data } = await LoginRoutes.Login({ email, password })
			setUser(data);
			return data
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
			await LoginRoutes.Logout();
			setUser(null);
			return true;
		}
		catch (error) {
			setErrors(error.response?.data?.errors)
			throw error;
		} finally {
			setIsLoading(false)
		}
	}

	async function getUser() {
		try {
			let { data } = await UserRoutes.ShowUser()
			setUser(data);
			return data
		} catch (error) { }
	}

	function isLoggedIn() {
		return !!user
	}
	
	function getCurrentUser() {
		return user
	}

	return {
		user,
		login,
		logout,
		getUser,
		getCurrentUser,
		isLoggedIn,
		errors,
		setErrors,
		isLoading,
		setIsLoading
	}
}

export default useAuth