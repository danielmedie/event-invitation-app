export const UserRoutes = {
	ShowUser: async () => {
		return await api().get('api/user');
	},
}

export const LoginRoutes = {
	Login: async (data) => {
		return await api().post('api/login', data)
	},
	Logout : async () => {
		return await api().post('api/logout')
	},
}

export const GuestRoutes = {
	GetGuests: async (args = {}) => {
		return await api().get('api/guests', args);
	},
	GetGuest: async (guest,args = {}) => {
		return await api().get(`api/guests/${guest}`,args);
	},
	CreateGuest: async ({ guest }) => {
		return await api().post('api/guests',guest);
	},
	UpdateGuest: async (guest, data = {}) => {
		return await api().put(`api/guests/${guest}`,data);
	},
	DeleteGuest: async ({ guest }) => {
		return await api().delete(`api/guests/${guest}`);
	}
}

export const InvitationRoutes = {
	GetInvitations: async (args = {}) => {
		return await api().get('api/invitations', args);
	},
	GetInvitation: async (invitation,args = {}) => {
		return await api().get(`api/invitations/${invitation}`,args);
	},
	CreateInvitation: async ({ invitation }) => {
		return await api().post('api/invitations',invitation);
	},
	UpdateInvitation: async (invitation, data = {}) => {
		return await api().put(`api/invitations/${invitation}`,data);
	},
	DeleteInvitation: async ({ invitation }) => {
		return await api().delete(`api/invitations/${invitation}`);
	}
}

export const EventRoutes = {
	GetEvent: async (args = {}) => {
		return await api().get(`api/event`,args);
	},
}

export default {
	User : UserRoutes,
	Login : LoginRoutes,
	Guest : GuestRoutes,
	Invitation : InvitationRoutes,
	Event : EventRoutes
}