import React, { useState } from 'react';
import axios from 'axios'; // För att göra API-anrop

function GuestRSVP() {
  const [attendance, setAttendance] = useState(''); // Förvarar gästens närvaro
  const [allergies, setAllergies] = useState(''); // Förvarar gästens allergier

  const handleRSVPSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Anropar din backend med gästens RSVP-information
      const response = await axios.put(`/api/invite/rsvp/{guest}/attendance`, {
        attendance,
        allergies,
      });

      // Visa ett meddelande eller gör något med svar från backenden
      console.log(response.data); // Visar det svar som kommer tillbaka från backend
    } catch (error) {
      // Hantera eventuella fel här
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Gäst-RSVP</h2>
      <form onSubmit={handleRSVPSubmit}>
        <label>
          Närvaro:
          <select value={attendance} onChange={(e) => setAttendance(e.target.value)}>
            <option value="">Välj ett alternativ</option>
            <option value="kommer">Kommer</option>
            <option value="kommer ej">Kommer ej</option>
          </select>
        </label>
        <br />
        <label>
          Allergier:
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="Ange eventuella allergier"
          />
        </label>
        <br />
        <button type="submit">Skicka RSVP</button>
      </form>
    </div>
  );
}

export default GuestRSVP;
