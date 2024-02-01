import { useEffect, useState } from "react";
import { InviteRoutes } from '../api/active-invite-api';
import { redirect } from "react-router-dom";

// Funktion för att ladda inbjudningsdata som en del av route loading processen
export const invitationAuthCheckRouteLoader = async () => {
	try {
		// Försök hämta inbjudningsdata från API
		let { data } = await InviteRoutes.GetInvite();

		// Om det inte finns inbjudningsdata, omdirigera till välkomstsidan
		if (!data) {
			return redirect('/welcome');
		}

		return null; // Om inbjudningsdata finns, returnera null (ingen omdirigering)
	} catch (error) {
		// Vid fel, omdirigera till välkomstsidan
		return redirect('/welcome');
	}
};

// Anpassad hook för att hantera inbjudningsautentisering
export const useInvitationAuth = () => {
	// Tillståndsvariabler för inbjudningsinformation, laddningstillstånd och felmeddelanden
	const [invitation, setInvitation] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const [errors, setErrors] = useState([]);

	// Funktion för att utföra inloggning med inbjudningskod
	async function login(code) {
		// Återställ tidigare fel och sätt laddningstillstånd
		setErrors([]);
		setIsLoading(true);

		try {
			// Försök logga in genom att göra en begäran till inloggnings-API-routen med inbjudningskoden
			let { data } = await InviteRoutes.LoginInvite({ code });
			// Sätt Bearer Token i API-anropet för att autentisera framtida förfrågningar
			api().setBearerToken(data.token);
			// Hämta inbjudningsdata efter lyckad inloggning
			let loggedIn = await getInvitation();
			return loggedIn;
		} catch (error) {
			setErrors(error.response?.data?.errors); // Sätt felmeddelanden vid inloggningsfel
			throw error; // Kasta felet vidare för ytterligare hantering
		} finally {
			setIsLoading(false); // Återställ laddningstillståndet oavsett resultat
		}
	}

	// Funktion för att utföra utloggning från inbjudning
	async function logout() {
		setErrors([]);
		setIsLoading(true);

		try {
			// Försök logga ut genom att göra en begäran till utloggnings-API-routen för inbjudningar
			await InviteRoutes.LogoutInvite();
			// Ta bort Bearer Token för att avsluta autentisering
			api().deleteBearerToken();
			setInvitation(null); // Återställ inbjudningsinformation vid lyckad utloggning
			return true;
		} catch (error) {
			setErrors(error.response?.data?.errors); // Sätt felmeddelanden vid utloggningsfel
			throw error; // Kasta felet vidare för ytterligare hantering
		} finally {
			setIsLoading(false); // Återställ laddningstillståndet oavsett resultat
		}
	}

	// Funktion för att hämta aktuell inbjudningsinformation
	async function getInvitation() {
		try {
			// Försök hämta inbjudningsdata från API
			let { data } = await InviteRoutes.GetInvite();
			setInvitation(data); // Sätt inbjudningsinformation vid lyckad hämtning
			return data;
		} catch (error) {
			// Ignorera fel vid hämtning av inbjudningsinformation
		}
	}

	// Funktion för att kontrollera om användaren är inloggad via inbjudning
	function isLoggedIn() {
		return !!invitation;
	}

	// Funktion för att hämta aktuell inbjudningsinformation
	function getCurrentInvitation() {
		return invitation;
	}

	// Returnera funktioner och tillståndsvariabler för användning i komponenten
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
};

// Exportera useInvitationAuth-hooken som standard export
export default useInvitationAuth;
