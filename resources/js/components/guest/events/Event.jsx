import React, { useState } from 'react';

function Event() {
  const [donationAmount, setDonationAmount] = useState(0);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');

  const handleDonation = async () => {
    alert(`Tack för din donation på ${donationAmount} kr!`);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border border-gray-300 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Examensfest för WIE22S</h2>
      <p className="text-gray-700 mb-4">
        Vi hälsar dig varmt välkommen till vår examensfest för WIE22S! Det är dags att fira av alla fantastiska prestationer och minnen från den senaste tiden.
      </p>
      <p className="text-gray-700 mb-4">
        Datum: 20 maj 2022<br />
        Tid: 20:00<br />
        Plats: SAL 20
      </p>
      <p className="text-gray-700 mb-4">
        Det kommer att bli en kväll fylld av skratt, musik och glädje. Vi ser fram emot att fira tillsammans med er!
      </p>
      <p className="text-gray-700">
        Vänliga hälsningar,<br />
        WIE22S Team
      </p>

      {/* Doneraknapp */}
      <div className="mt-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="donationAmount">
          Donera till festkontot:
        </label>
        <input
          id="donationAmount"
          type="number"
          className="w-full border p-2 rounded mb-2 focus:outline-none focus:shadow-outline"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          placeholder="Ange belopp (kr)"
        />

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardName">
          Kortinnehavarens namn:
        </label>
        <input
          id="cardName"
          type="text"
          className="w-full border p-2 rounded mb-2 focus:outline-none focus:shadow-outline"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Ange namn på kortet"
        />

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
          Kortnummer:
        </label>
        <input
          id="cardNumber"
          type="text"
          className="w-full border p-2 rounded mb-2 focus:outline-none focus:shadow-outline"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="xxxx xxxx xxxx xxxx"
        />

        <div className="flex mb-2">
          <div className="w-1/2 mr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expMonth">
              Utgångsdatum (månad):
            </label>
            <input
              id="expMonth"
              type="text"
              className="w-full border p-2 rounded focus:outline-none focus:shadow-outline"
              value={expMonth}
              onChange={(e) => setExpMonth(e.target.value)}
              placeholder="MM"
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expYear">
              Utgångsdatum (år):
            </label>
            <input
              id="expYear"
              type="text"
              className="w-full border p-2 rounded focus:outline-none focus:shadow-outline"
              value={expYear}
              onChange={(e) => setExpYear(e.target.value)}
              placeholder="YY"
            />
          </div>
        </div>

        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvc">
          CVC:
        </label>
        <input
          id="cvc"
          type="text"
          className="w-full border p-2 rounded mb-2 focus:outline-none focus:shadow-outline"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          placeholder="Ange CVC"
        />

        <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Skicka RSVP
            </button>
          </div>
      </div>
    </div>
  );
}

export default Event;
