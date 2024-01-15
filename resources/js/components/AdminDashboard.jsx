import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Installera och importera Axios

const AdminDashboard = () => {
  const [invitations, setInvitations] = useState([]);
  const [guests, setGuests] = useState([]);
  const [events, setEvents] = useState([]);

  // Hämta inbjudningar, gäster och händelser när komponenten mountas
  useEffect(() => {
    fetchInvitations();
    fetchGuests();
    fetchEvents();
  }, []);

  const fetchInvitations = async () => {
    try {
      const response = await axios.get('/api/invitations');
      setInvitations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGuests = async () => {
    try {
      const response = await axios.get('/api/guests');
      setGuests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Visa inbjudningar, gäster och händelser */}
      {/* Implementera formulär för att lägga till, uppdatera eller ta bort poster */}
    </div>
  );
};

export default AdminDashboard;
