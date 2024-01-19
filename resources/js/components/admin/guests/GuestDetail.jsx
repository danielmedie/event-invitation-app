import React from 'react';
import { useParams } from 'react-router-dom';

function GuestDetail() {

	const { guestId } = useParams();

	return (
		<div>GuestDetail {guestId}</div>
	);
}

export default GuestDetail;
