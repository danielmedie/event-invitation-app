import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function AdminGuestDetail() {
  const { guestId } = useParams();
  const [guest, setGuest] = useState({});
  const [editedGuest, setEditedGuest] = useState({
    name: '',
    name_tag: '',
    allergies: '',
  });

  useEffect(() => {
    fetchGuestDetails();
  }, [guestId]);

  const fetchGuestDetails = async () => {
    try {
      const response = await axios.get(`/api/guests/${guestId}`);
      setGuest(response.data);
      setEditedGuest({
        name: response.data.name,
        name_tag: response.data.name_tag,
        allergies: response.data.allergies,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateGuest = async () => {
    try {
      await axios.put(`/api/guests/${guestId}`, editedGuest);
      console.log('Guest information updated successfully!');
      // Visa SweetAlert när uppdateringen är klar
      Swal.fire({
        icon: 'success',
        title: 'Uppdatering klar!',
        text: 'Gästinformationen har uppdaterats.',
      });
    } catch (error) {
      console.error('Error updating guest information:', error);
      // Visa SweetAlert för felmeddelande
      Swal.fire({
        icon: 'error',
        title: 'Något gick fel!',
        text: 'Det uppstod ett fel vid uppdatering av gästinformationen.',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGuest((prevGuest) => ({
      ...prevGuest,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Gästinformation</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Namn:</label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          name="name"
          value={editedGuest.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Namnbricka:</label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          name="name_tag"
          value={editedGuest.name_tag}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Allergier:</label>
        <input
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          name="allergies"
          value={editedGuest.allergies}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={handleUpdateGuest}
      >
        Uppdatera
      </button>
    </div>
  );
}

export default AdminGuestDetail;
