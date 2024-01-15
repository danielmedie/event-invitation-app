export const InviteRoutes = {
	GetInvite: async (data = {}) => {
		return await api().get('api/invite/login/show',data);
	},
	LoginInvite: async (data = {}) => {
		return await api().post('api/invite/login', data)
	},
	LogoutInvite: async () => {
		return await api().post('api/invite/logout')
	},
}

export const GuestRoutes = {
	GetGuests: async (args = {}) => {
		return await api().get('api/invite/guests', args);
	},
	GetGuest: async (guest,args = {}) => {
		return await api().get(`api/invite/guests/${guest}`,args);
	},
	UpdateGuest: async (guest, data = {}) => {
		return await api().put(`api/invite/guests/${guest}`,data);
	},
}

export const RsvpRoutes = {
	UpdateRsvpAttendance: async (guest, data = {}) => {
		return await api().put(`api/invite/rsvp/${guest}//attendance`, data);
	},
}

export const EventRoutes = {
	GetEvent: async (args = {}) => {
		return await api().get(`api/invite/event/`,args);
	},
}

export default {
	Invite : InviteRoutes,
	Event : EventRoutes,
	Guest : GuestRoutes,
	Rsvp : RsvpRoutes
}