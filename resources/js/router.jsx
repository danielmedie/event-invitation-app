// Importera React och nödvändiga komponenter från react-router-dom
import * as React from 'react';
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from 'react-router-dom';

// Importera komponenter för olika sidor och layouter
import Login from './components/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/Dashboard';
import AdminEventView from './components/admin/events/EventView';
import AdminGuestsIndex from './components/admin/guests/GuestsIndex';
import AdminGuestCreate from './components/admin/guests/GuestCreate';
import AdminGuestDetail from './components/admin/guests/GuestDetail';
import GuestLayout from './components/guest/GuestLayout';
import GuestWelcome from './components/guest/Welcome';
import GuestEvent from './components/guest/events/Event';
import GuestRsvp from './components/guest/rsvp/Rsvp';
import NoMatch from './components/NoMatch';

// Importera anpassade hookar för autentisering
import { authCheckRouteLoader } from './hooks/useAuth';
import { invitationAuthCheckRouteLoader } from './hooks/useInvitationAuth';

// Skapa och konfigurera routern med olika sidor och deras hierarki
const router = createBrowserRouter([
	{
		// Indexruta, omdirigera till "/welcome"
		index: true,
		element: <Navigate to="/welcome" />,
	},
	{
		// Login-sida
		path: "/login",
		element: <Login />,
	},
	{
		// Admin-sidan och dess layout, med autentiseringskontroll
		path: "/admin",
		element: <AdminLayout />,
		loader: authCheckRouteLoader,
		children: [
			{
				// Admin Dashboard
				path: "",
				element: <AdminDashboard />,
			},
			{
				// Admin Event View
				path: "event",
				element: <AdminEventView />,
			},
			{
				// Admin Guests-sidan och dess undernavigering
				path: "guests",
				children: [
					{
						// Indexsida för gäster
						index: true,
						element: <AdminGuestsIndex />,
					},
					{
						// Skapa gäst-sida
						path: "create",
						element: <AdminGuestCreate />,
					},
					{
						// Detaljsida för en specifik gäst
						path: ":guestId",
						element: <AdminGuestDetail />,
					},
				]
			}
		],
	},
	{
		// Gästsidan och dess undernavigering
		element: <GuestLayout />,
		children: [
			{
				// Välkomstsida för gäster
				path: "welcome",
				element: <GuestWelcome />,
			},
			{
				// RSVP-sida för gäster, med autentiseringskontroll för inbjudan
				path: "rsvp",
				loader: invitationAuthCheckRouteLoader,
				element: <GuestRsvp />,
			},
			{
				// Evenemangssida för gäster, med autentiseringskontroll för inbjudan
				path: "event",
				loader: invitationAuthCheckRouteLoader,
				element: <GuestEvent />,
			},
		]
	},
	{
		// Hantera sidor som inte matchar någon av de definierade ruterna
		path: '*',
		element: <NoMatch />
	}
]);

// Skapa komponenten Router som använder RouterProvider för att tillhandahålla routern till hela applikationen
const Router = () => {
	return <RouterProvider
		router={router}
		fallbackElement={<div>Loading</div>}
	/>
}

// Exportera Router-komponenten
export default Router;
