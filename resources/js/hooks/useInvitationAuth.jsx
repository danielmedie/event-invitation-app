import { useEffect, useState } from "react"
import { InviteRoutes } from '../api/active-invite-api';
import { redirect } from "react-router-dom";
import { GuestRoutes } from '../api/active-invite-api'; // Import the GuestRoutes


export const invitationAuthCheckRouteLoader = async () => {
	try {
		let { data } = await InviteRoutes.GetInvite()
		if (!data) {
			return redirect('/welcome')
		}
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
		  console.log('Fetching invitation...');
		  let { data } = await InviteRoutes.GetInvite();
		  console.log('Fetched invitation data:', data);
	  
		  // If "guest" information is associated with the invitation, fetch it
		  if (data && data.guest_id) {
			console.log('Fetching guest information...');
			const guestResponse = await GuestRoutes.GetGuestById(data.guest_id);
			
			// Log the response from the guest route
			console.log('Guest route response:', guestResponse);
	  
			const guestData = guestResponse.data;
			console.log('Fetched guest data:', guestData);
	  
			// Update the invitation state with the guest information
			setInvitation((prevInvitation) => ({ ...prevInvitation, guest: guestData }));
			console.log('Updated invitation with guest information:', invitation);
	  
			return { ...data, guest: guestData };
		  }
	  
		  console.log('No guest information associated with the invitation.');
		  return data;
		} catch (error) {
		  console.error('Error fetching invitation:', error);
		}
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
	  };
	}
	
	export default useInvitationAuth;