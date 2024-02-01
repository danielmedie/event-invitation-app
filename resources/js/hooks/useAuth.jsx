import { useState } from "react";
import { LoginRoutes, UserRoutes } from '../api/admin-api';
import { redirect } from "react-router-dom";

// Funktion för att ladda användardata som en del av route loading processen
export const authCheckRouteLoader = async () => {
    try {
        // Försök hämta användardata från API
        let { data } = await UserRoutes.ShowUser();
        return data; // Returnera användardata om det finns
    } catch (error) {
        // Om det uppstår ett fel (till exempel om användaren inte är autentiserad), omdirigera till inloggningssidan
        return redirect('/login');
    }
};

// Anpassad hook för att hantera autentisering
export const useAuth = () => {
    // Tillståndsvariabler för användarinformation, laddningstillstånd och felmeddelanden
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [errors, setErrors] = useState([]);

    // Funktion för att utföra inloggning
    async function login(email, password) {
        // Återställ tidigare fel och sätt laddningstillstånd
        setErrors([]);
        setIsLoading(true);

        try {
            // Försök logga in genom att göra en begäran till inloggnings-API-routen
            let { data } = await LoginRoutes.Login({ email, password });
            setUser(data); // Sätt användarinformation vid lyckad inloggning
            return data;
        } catch (error) {
            setErrors(error.response?.data?.errors); // Sätt felmeddelanden vid inloggningsfel
            throw error; // Kasta felet vidare för ytterligare hantering
        } finally {
            setIsLoading(false); // Återställ laddningstillståndet oavsett resultat
        }
    }

    // Funktion för att utföra utloggning
    async function logout() {
        setErrors([]);
        setIsLoading(true);

        try {
            // Försök logga ut genom att göra en begäran till utloggnings-API-routen
            await LoginRoutes.Logout();
            setUser(null); // Återställ användarinformation vid lyckad utloggning
            return true;
        } catch (error) {
            setErrors(error.response?.data?.errors); // Sätt felmeddelanden vid utloggningsfel
            throw error; // Kasta felet vidare för ytterligare hantering
        } finally {
            setIsLoading(false); // Återställ laddningstillståndet oavsett resultat
        }
    }

    // Funktion för att hämta användarinformation
    async function getUser() {
        try {
            // Försök hämta användarinformation från API
            let { data } = await UserRoutes.ShowUser();
            setUser(data); // Sätt användarinformation vid lyckad hämtning
            return data;
        } catch (error) {
            // Ignorera fel vid hämtning av användarinformation
        }
    }

    // Funktion för att kontrollera om användaren är inloggad
    function isLoggedIn() {
        return !!user;
    }

    // Funktion för att hämta aktuell användarinformation
    function getCurrentUser() {
        return user;
    }

    // Returnera funktioner och tillståndsvariabler för användning i komponenten
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
    };
};

// Exportera useAuth-hooken som standard export
export default useAuth;
