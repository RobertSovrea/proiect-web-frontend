// src/EventForm.js
import './EventForm.css';
import React, { useState } from 'react';
import axios from 'axios';

function EventForm({ onEventCreated }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [dressCode, setDressCode] = useState('');
  const [partyType, setPartyType] = useState('');
  const [eventDate, setEventDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formattedDate = new Date(eventDate.getTime() - (eventDate.getTimezoneOffset() * 60000)).toISOString();
      
      const response = await axios.post('http://localhost:8080/api/events/create', {
        name,
        location,
        dressCode,
        partyType,
        eventDate: formattedDate.split('T')[0],
      });
  
      console.log('Event created:', response.data);
      onEventCreated();
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nume:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Locație:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <br />
      <label>
        Dress Code:
        <input type="text" value={dressCode} onChange={(e) => setDressCode(e.target.value)} />
      </label>
      <br />
      <label>
        Tip:
        <input type="text" value={partyType} onChange={(e) => setPartyType(e.target.value)} />
      </label>
      <br />
      <label>
        Data:
        <input type="date" value={eventDate.toISOString().split('T')[0]} onChange={(e) => setEventDate(new Date(e.target.value))} />
      </label>
      <br />
      <button type="submit">Creează eveniment</button>
    </form>
  );
}

export default EventForm;
