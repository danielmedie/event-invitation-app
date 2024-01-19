import React from 'react';
import { useParams } from 'react-router-dom';

function InvitationDetail() {

	const { invitationId } = useParams();

	return (
		<div>InvitationDetail {invitationId}</div>
	);
}

export default InvitationDetail;
