// src/App.js
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventForm from './EventForm';
import MyEventList from './components/EventList';
import Calendar from 'react-calendar';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventCreated = () => {
    fetchEvents();
  };

  const handleEventSelection = (event) => {
    setSelectedEvent(event);
  };

  // Calculează evenimentele curente pentru pagina afișată
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Schimbă pagina
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1 className="title">Evenimente</h1>
      <EventForm onEventCreated={handleEventCreated} />
      <MyEventList events={currentEvents} selectedEvent={selectedEvent} onEventSelect={handleEventSelection} />
      <Calendar
        value={selectedEvent ? new Date(selectedEvent.eventDate) : new Date()}
        onChange={(date) => handleEventSelection({ eventDate: date })}
      />
      <div className='pagination'>
        {[...Array(Math.ceil(events.length / eventsPerPage)).keys()].map(number => (
          <button key={number} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
