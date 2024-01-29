import React, { useEffect, useState } from 'react';
import useInvitationAuth from '../../../hooks/useInvitationAuth';
import { RsvpRoutes, GuestRoutes } from '../../../api/active-invite-api';
import Swal from 'sweetalert2';

function GuestRSVP() {
  const { getCurrentInvitation, login, errors, setErrors, getInvitation } = useInvitationAuth();

  // Update State
  useEffect(() => { getInvitation() }, [])
  const invitation = getCurrentInvitation();

  const [guestId, setGuestId] = useState('');
  const [attendance, setAttendance] = useState('');
  const [allergies, setAllergies] = useState('');

  // If ther is only 1 guest, set it automatically
  useEffect(() => {
    if (invitation?.guests.length == 1) {
      setGuestId(invitation.guests[0].id)
      setAttendance((invitation.guests[0].attending ? 1 : 0))
      setAllergies(invitation.guests[0].allergies || '')
    }
  }, [invitation])

  const handleRSVPSubmit = async (event) => {
    event.preventDefault();


    try {
      if (attendance === '') {
        throw new Error('No RSVP option selected')
      }

      let rsvpResponse = await RsvpRoutes.UpdateRsvpAttendance({ id: guestId }, { attending: (attendance === '1') })
      let allergiesResponse = await GuestRoutes.UpdateGuest(guestId, { allergies })
      Swal.fire({
        icon: 'success',
        title: 'Uppdatering klar!',
        text: 'Gästinformationen har uppdaterats.',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Fel!',
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Gäst-RSVP</h2>
        <form onSubmit={handleRSVPSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guest">
              Gäst:
            </label>
            <select
              id="guest"
              className="w-full border p-2 rounded"
              value={guestId}
              disabled={invitation?.guests.length == 1 ? 'disabled' : null}
              onChange={(e) => setGuestId(e.target.value)}
            >
              {invitation?.guests.map(function (guest, i) {
                return <option value={guest.id} key={guest.id}>{guest.name}</option>;
              })}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attendance">
              Närvaro:
            </label>
            <select
              id="attendance"
              className="w-full border p-2 rounded"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
            >
              <option value="">Välj ett alternativ</option>
              <option value="1">Kommer</option>
              <option value="0">Kommer ej</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allergies">
              Allergier:
            </label>
            <textarea
              id="allergies"
              type="text"
              className="w-full border p-2 rounded"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="Ange eventuella allergier"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Skicka RSVP
          </button>
        </form>
      </div>
    </div>
  );
}

export default GuestRSVP;

