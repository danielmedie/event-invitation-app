import React from 'react';
import { Outlet } from 'react-router-dom';

function Admin() {
	return (
		<div className="app-page">
			<Outlet />
		</div>
	);
}

export default Admin;
