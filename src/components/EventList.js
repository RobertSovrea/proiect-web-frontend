// src/components/EventList.js
import React from 'react';

function EventList({ events, selectedEvent, onEventSelect }) {
  // Funcție pentru a formata data pentru afișare
  const displayFormattedDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      // Dacă data este validă, returnează data formatată
      return date.toISOString().split('T')[0];
    } else {
      // Dacă data nu este validă, returnează un mesaj de eroare sau o valoare implicită
      return "Data nu este disponibilă";
    }
  };

  if (!events || events.length === 0) {
    return <p>Nu există evenimente disponibile.</p>;
  }

  return (
    <ul>
      {events.map((event) => (
        <li key={event.id} className={`event-item ${selectedEvent && selectedEvent.id === event.id ? 'selected' : ''}`} onClick={() => onEventSelect(event)}>
          <strong>{event.name}</strong>
          <p>
            Tip: {event.partyType}<br />
            Locație: {event.location}<br />
            Dress code: {event.dressCode}<br />
            Data evenimentului: {displayFormattedDate(event.eventDate)} {/* Asumând că 'eventDate' este numele corect */}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default EventList;
