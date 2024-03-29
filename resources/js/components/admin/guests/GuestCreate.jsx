import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { GuestRoutes } from '../../../api/admin-api' 

const AddGuestForm = () => {
  const [name, setName] = useState('');
  const [nameTag, setNameTag] = useState('');
  const [invitationId, setInvitationId] = useState(null);
  const [allergies, setAllergies] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Skapa ett objekt med gästens attribut
    const newGuest = {
      name,
      name_tag: nameTag,
      invitation_id: invitationId,
      allergies,
    };

    try {
      // Anropa överordnad komponentfunktionen för att lägga till gästen
	  await GuestRoutes.CreateGuest({ guest : newGuest });

      // Visa en SweetAlert för att informera om att gästen har lagts till
      Swal.fire({
        icon: 'success',
        title: 'Gäst tillagd!',
        text: `Gästen ${name} har lagts till.`,
      });

      // Återställ formuläret
      setName('');
      setNameTag('');
      setInvitationId(null);
      setAllergies('');
    } catch (error) {
      console.error('Error adding guest:', error);

      // Visa en SweetAlert för felmeddelande
      Swal.fire({
        icon: 'error',
        title: 'Något gick fel!',
        text: 'Det uppstod ett fel vid tillägg av gästen.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white border border-gray-300 shadow-md rounded-md">
	  <h1 className="text-2xl font-bold mb-4">Lägg till gäst</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Namn:
        </label>
        <input
          id="name"
          type="text"
          className="w-full border p-2 rounded mb-2 focus:outline-none focus:shadow-outline"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameTag">
          Namn-tag:
        </label>
        <input
          id="nameTag"
          type="text"
          className="w-full border p-2 rounded mb-2 focus:outline-none focus:shadow-outline"
          value={nameTag}
          onChange={(e) => setNameTag(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Lägg till gäst
      </button>
    </form>
  );
};

export default AddGuestForm;
