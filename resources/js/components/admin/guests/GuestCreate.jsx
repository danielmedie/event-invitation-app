import React, { useState } from 'react';

const AddGuestForm = ({ onAddGuest }) => {
  const [name, setName] = useState('');
  const [nameTag, setNameTag] = useState('');
  const [invitationId, setInvitationId] = useState(null);
  const [allergies, setAllergies] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Skapa ett objekt med gästens attribut
    const newGuest = {
      name,
      name_tag: nameTag,
      invitation_id: invitationId,
      allergies,
    };

    // Anropa överordnad komponentfunktionen för att lägga till gästen
    onAddGuest(newGuest);

    setName('');
    setNameTag('');
    setInvitationId(null);
    setAllergies('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Namn:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Namn-tag:
        <input type="text" value={nameTag} onChange={(e) => setNameTag(e.target.value)} />
      </label>
      <label>
        Inbjudan ID:
        <input type="number" value={invitationId || '1'} onChange={(e) => setInvitationId(Number(e.target.value))} />
      </label>
      <label>
        Allergier:
        <input type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
      </label>
      <button type="submit">Lägg till gäst</button>
    </form>
  );
};

export default AddGuestForm;
