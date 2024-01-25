import React, { useState } from 'react';
import axios from 'axios';

function GuestRSVP() {
  const [attendance, setAttendance] = useState('');
  const [allergies, setAllergies] = useState('');

  const handleRSVPSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('Submitting RSVP:', { attendance, allergies });

      const guestId = 1; 
      const response = await axios.put(`/api/invite/rsvp/${guestId}/attendance`, {
        attendance,
        allergies,
      });

      console.log('RSVP Response:', response.data);
    } catch (error) {
      console.error('RSVP Error:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Gäst-RSVP</h2>
        <form onSubmit={handleRSVPSubmit}>
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
            <option value="kommer">Kommer</option>
            <option value="kommer ej">Kommer ej</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allergies">
            Allergier:
          </label>
          <input
            id="allergies"
            type="text"
            className="w-full border p-2 rounded"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="Ange eventuella allergier"
          />
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

