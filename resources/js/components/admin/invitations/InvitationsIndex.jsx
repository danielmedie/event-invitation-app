import React, { useEffect, useState } from 'react';
import { InvitationRoutes } from '../../../api/admin-api'

function InvitationsIndex() {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      const response = await InvitationRoutes.GetInvitations('/api/invitations');
      setInvitations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">All invitations</h1>
      <ul className="list-disc pl-4">
        {invitations.map((invitation) => (
          <li key={invitation.id} className="mb-2">{invitation.id} - {invitation.code}</li>
        ))}
      </ul>
    </div>
  );
}

export default InvitationsIndex;
