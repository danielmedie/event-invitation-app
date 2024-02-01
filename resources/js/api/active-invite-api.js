// Importera och exportera API-funktioner och routedefinitioner för inbjudningar
export const InviteRoutes = {
    // Hämta inbjudningsinformation
    GetInvite: async (data = {}) => {
        return await api().get('api/invite/login/show', data);
    },
    // Logga in med inbjudningsinformation
    LoginInvite: async (data = {}) => {
        return await api().post('api/invite/login', data);
    },
    // Logga ut från inbjudning
    LogoutInvite: async () => {
        return await api().post('api/invite/logout');
    },
}

// Importera och exportera API-funktioner och routedefinitioner för gäster
export const GuestRoutes = {
    // Hämta alla gäster
    GetGuests: async (args = {}) => {
        return await api().get('api/invite/guests', args);
    },
    // Hämta information om en specifik gäst
    GetGuest: async (guest, args = {}) => {
        return await api().get(`api/invite/guests/${guest}`, args);
    },
    // Uppdatera information om en specifik gäst
    UpdateGuest: async (guestId, data = {}) => {
        return await api().put(`api/invite/guests/${guestId}`, data);
    },
}

// Importera och exportera API-funktioner och routedefinitioner för RSVP (Svara på inbjudan)
export const RsvpRoutes = {
    // Uppdatera deltagandestatus för en gäst
    UpdateRsvpAttendance: async (guest, data = {}) => {
        return await api().put(`api/invite/rsvp/${guest.id}/attendance`, data);
    },
};

// Importera och exportera API-funktioner och routedefinitioner för evenemang
export const EventRoutes = {
    // Hämta information om evenemanget
    GetEvent: async (args = {}) => {
        return await api().get(`api/invite/event/`, args);
    },
}

// Exportera alla routedefinitioner inom respektive kategori
export default {
    Invite: InviteRoutes,
    Event: EventRoutes,
    Guest: GuestRoutes,
    Rsvp: RsvpRoutes,
}
