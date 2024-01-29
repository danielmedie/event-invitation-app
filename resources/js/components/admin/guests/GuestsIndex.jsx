import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function AdminComponent() {
  const [guests, setGuests] = useState([]);


  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await axios.get('/api/guests');
      setGuests(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDeleteGuest = async (guestId) => {
    try {
      // Skicka ett DELETE-anrop till API för att ta bort gästen med det angivna ID:et
      await axios.delete(`/api/guests/${guestId}`);
      // Uppdatera gästlistan efter borttagningen
      fetchGuests();
    } catch (error) {
      console.error('Error deleting guest:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gäster</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 py-2 px-4">ID</th>
            <th className="border border-gray-300 py-2 px-4">Namn</th>
            <th className="border border-gray-300 py-2 px-4">Namnbricka</th>
            <th className="border border-gray-300 py-2 px-4">Inbjudan ID</th>
            <th className="border border-gray-300 py-2 px-4">Allergier</th>
            <th className="border border-gray-300 py-2 px-4">Åtgärder</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td className="border border-gray-300 py-2 px-4">{guest.id}</td>
              <td className="border border-gray-300 py-2 px-4">{guest.name}</td>
              <td className="border border-gray-300 py-2 px-4">{guest.name_tag}</td>
              <td className="border border-gray-300 py-2 px-4">{guest.invitation_id}</td>
              <td className="border border-gray-300 py-2 px-4">{guest.allergies}</td>
              <td className="border border-gray-300 py-2 px-4">
              <Link to={`/admin/guests/${guest.id}`} className="text-blue-500 underline">
                  Visa detaljer
                </Link>
                <button
                  onClick={() => handleDeleteGuest(guest.id)}
                  className="ml-2 text-red-500 underline cursor-pointer"
                >
                  Ta bort
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminComponent;
