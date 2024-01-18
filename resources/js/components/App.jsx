import * as React from 'react';
import {
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import SimpleLayout from './layouts/SimpleLayout'
import Login from './auth/Login'
import Logout from './auth/Logout'
import AdminLayout from './admin/AdminLayout'
import AdminEventView from './admin/events/EventView'
import AdminGuestsIndex from './admin/guests/GuestsIndex'
import AdminGuestCreate from './admin/guests/GuestCreate'
import AdminGuestDetail from './admin/guests/GuestDetail'
import AdminInvitationsIndex from './admin/invitations/InvitationsIndex'
import AdminInvitationCreate from './admin/invitations/InvitationCreate'
import AdminInvitationDetail from './admin/invitations/InvitationDetail'
import GuestLayout from './guest/GuestLayout'
import GuestWelcome from './guest/Welcome'
import GuestEvent from './guest/events/Event'
import GuestRsvp from './guest/rsvp/Rsvp'
import NoMatch from './NoMatch'

const App = () => {
	return (
		<>
			<div id='app-container'>
				<Routes>
					<Route index element={<Navigate to="/welcome" />} />

					<Route path="login" element={<Navigate to="/auth/login" />} />

					<Route path="auth" element={<SimpleLayout />}>
						<Route path="login" element={<Login />} />
						{/* Protected */}
						<Route path="logout" element={<Logout/>} /> 
					</Route>
					
					{/* Admin */}
					<Route path="admin" element={<AdminLayout />}>
						{/* Dasboard */}
						<Route path="" element={<div>Admin Dashboard</div>} />
						{/* Events */}
						<Route path="event">
							<Route path="" element={<AdminEventView/>} />
						</Route>
						{/* Guests */}
						<Route path="guests">
							<Route path="" element={<AdminGuestsIndex />} />
							<Route path="create" element={<AdminGuestCreate />} />
							<Route path=":guestId" element={<AdminGuestDetail />} />
						</Route>
						{/* Invitations */}
						<Route path="invitations">
							<Route path="" element={<AdminInvitationsIndex />} />
							<Route path="create" element={<AdminInvitationCreate />} />
							<Route path=":invitationId" element={<AdminInvitationDetail />} />
						</Route>
					</Route>
					
					{/* Guest/Invite */}
					<Route element={<GuestLayout />}>
						<Route path="welcome" element={<GuestWelcome />} />
						<Route path="rsvp" element={<GuestRsvp />} />
						<Route path="event" element={<GuestEvent />} />
					</Route>

					<Route path="*" element={<NoMatch />} />
				</Routes>
			</div>
		</>
	);
};

export default App;