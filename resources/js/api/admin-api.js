// Importera och exportera API-funktioner och routedefinitioner för användare
export const UserRoutes = {
    // Hämta användarinformation
    ShowUser: async () => {
        return await api().get('api/user');
    },
}

// Importera och exportera API-funktioner och routedefinitioner för inloggning/utloggning
export const LoginRoutes = {
    // Logga in med användarinformation
    Login: async (data) => {
        return await api().post('api/login', data);
    },
    // Logga ut
    Logout: async () => {
        return await api().post('api/logout');
    },
}

// Importera och exportera API-funktioner och routedefinitioner för gäster
export const GuestRoutes = {
    // Hämta alla gäster
    GetGuests: async (args = {}) => {
        return await api().get('api/guests', args);
    },
    // Hämta information om en specifik gäst
    GetGuest: async (guest, args = {}) => {
        return await api().get(`api/guests/${guest}`, args);
    },
    // Skapa en ny gäst
    CreateGuest: async ({ guest }) => {
        return await api().post('api/guests', guest);
    },
    // Uppdatera information om en specifik gäst
    UpdateGuest: async (guest, data = {}) => {
        return await api().put(`api/guests/${guest}`, data);
    },
    // Ta bort en specifik gäst
    DeleteGuest: async ({ guest }) => {
        return await api().delete(`api/guests/${guest}`);
    }
}

// Importera och exportera API-funktioner och routedefinitioner för inbjudningar
export const InvitationRoutes = {
    // Hämta alla inbjudningar
    GetInvitations: async (args = {}) => {
        return await api().get('api/invitations', args);
    },
    // Hämta information om en specifik inbjudan
    GetInvitation: async (invitation, args = {}) => {
        return await api().get(`api/invitations/${invitation}`, args);
    },
    // Skapa en ny inbjudan
    CreateInvitation: async ({ invitation }) => {
        return await api().post('api/invitations', invitation);
    },
    // Uppdatera information om en specifik inbjudan
    UpdateInvitation: async (invitation, data = {}) => {
        return await api().put(`api/invitations/${invitation}`, data);
    },
    // Ta bort en specifik inbjudan
    DeleteInvitation: async ({ invitation }) => {
        return await api().delete(`api/invitations/${invitation}`);
    }
}

// Importera och exportera API-funktioner och routedefinitioner för evenemang
export const EventRoutes = {
    // Hämta information om evenemanget
    GetEvent: async (args = {}) => {
        return await api().get(`api/event`, args);
    },
}

// Exportera alla routedefinitioner inom respektive kategori
export default {
    User: UserRoutes,
    Login: LoginRoutes,
    Guest: GuestRoutes,
    Invitation: InvitationRoutes,
    Event: EventRoutes
}
