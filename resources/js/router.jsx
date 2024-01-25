import * as React from 'react';
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from 'react-router-dom';

import Login from './components/admin/Login'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './components/admin/Dashboard'
import AdminEventView from './components/admin/events/EventView'
import AdminGuestsIndex from './components/admin/guests/GuestsIndex'
import AdminGuestCreate from './components/admin/guests/GuestCreate'
import AdminGuestDetail from './components/admin/guests/GuestDetail'
import AdminInvitationsIndex from './components/admin/invitations/InvitationsIndex'
import AdminInvitationCreate from './components/admin/invitations/InvitationCreate'
import AdminInvitationDetail from './components/admin/invitations/InvitationDetail'
import GuestLayout from './components/guest/GuestLayout'
import GuestWelcome from './components/guest/Welcome'
import GuestEvent from './components/guest/events/Event'
import GuestRsvp from './components/guest/rsvp/Rsvp'
import NoMatch from './components/NoMatch'

import { authCheckRouteLoader } from './hooks/useAuth';
import { invitationAuthCheckRouteLoader } from './hooks/useInvitationAuth';

const router = createBrowserRouter([
	{
		index: true,
		element: <Navigate to="/welcome" />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/admin",
		element: <AdminLayout />,
		// loader: authCheckRouteLoader,
		children: [
			{
				path: "",
				element: <AdminDashboard />,
			},
			{
				path: "event",
				element: <AdminEventView />,
			},
			{
				path: "guests",
				children: [
					{
						index: true,
						element: <AdminGuestsIndex />,
					},
					{
						path: "create",
						element: <AdminGuestCreate />,
					},
					{
						path: ":guestId",
						element: <AdminGuestDetail />,
					},
				]
			},
			{
				path: "invitations",
				children: [
					{
						index: true,
						element: <AdminInvitationsIndex />,
					},
					{
						path: "create",
						element: <AdminInvitationCreate />,
					},
					{
						path: ":invitationId",
						element: <AdminInvitationDetail />,
					},
				]
			}
		],
	},
	{
		element: <GuestLayout />,
		children: [
			{
				path: "welcome",
				element: <GuestWelcome />,
			},
			{
				path: "rsvp",
				loader : invitationAuthCheckRouteLoader,
				element: <GuestRsvp />,
			},
			{
				path: "event",
				loader : invitationAuthCheckRouteLoader,
				element: <GuestEvent />,
			},
		]
	},
	{
		path : '*',
		element : <NoMatch />
	}
]);


const Router = () => {
	return <RouterProvider
		router={router}
		fallbackElement={<div>Loading</div>}
	/>
}

export default Router