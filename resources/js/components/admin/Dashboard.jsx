import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddGuestForm from './guests/GuestCreate';

const AdminDashboard = () => {
  const [guests, setGuests] = useState([]);

  const handleAddGuest = async (newGuest) => {
    try {
      // Skicka den nya gästen till servern
      const response = await axios.post('/api/guests', newGuest);
      // Uppdatera gästlistan efter att gästen har lagts till
      setGuests([...guests, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AddGuestForm onAddGuest={handleAddGuest} />
    </div>
  );
};

export default AdminDashboard;
