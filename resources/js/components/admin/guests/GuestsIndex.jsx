import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
    // Visa en SweetAlert för bekräftelse
    const result = await Swal.fire({
      title: 'Är du säker?',
      text: 'Gästen kommer tas bort permanent!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ja, ta bort!',
      cancelButtonText: 'Avbryt',
    });

    // Om användaren bekräftar borttagningen
    if (result.isConfirmed) {
      try {
        // Skicka ett DELETE-anrop till API för att ta bort gästen med det angivna ID:et
        await axios.delete(`/api/guests/${guestId}`);
        // Uppdatera gästlistan efter borttagningen
        fetchGuests();
        // Visa en SweetAlert för att informera om att borttagningen är klar
        Swal.fire({
          icon: 'success',
          title: 'Borttagning klar!',
          text: 'Gästen har tagits bort.',
        });
      } catch (error) {
        console.error('Error deleting guest:', error);
        // Visa en SweetAlert för felmeddelande
        Swal.fire({
          icon: 'error',
          title: 'Något gick fel!',
          text: 'Det uppstod ett fel vid borttagning av gästen.',
        });
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gäster</h1>
      <button><Link to={`/admin`} className="text-blue-500 underline">Lägg till gäst</Link></button>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 py-2 px-4">ID</th>
            <th className="border border-gray-300 py-2 px-4">Namn</th>
            <th className="border border-gray-300 py-2 px-4">Namnbricka</th>
            <th className="border border-gray-300 py-2 px-4">Inbjudnigskod</th>
            <th className="border border-gray-300 py-2 px-4">Kommer</th> {/* Ny kolumn för "Kommer" */}

            <th className="border border-gray-300 py-2 px-4">Åtgärder</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td className="border border-gray-300 py-2 px-4">{guest.id}</td>
              <td className="border border-gray-300 py-2 px-4">{guest.name}</td>
              <td className="border border-gray-300 py-2 px-4">{guest.name_tag}</td>
              <td className="border border-gray-300 py-2 px-4">{guest.invitation ? guest.invitation.code : 'N/A'}</td>
              <td className="border border-gray-300 py-2 px-4">{guest.attending ? 'Ja' : 'Nej'}</td> {/* Använder attending för att visa om gästen kommer */}

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
