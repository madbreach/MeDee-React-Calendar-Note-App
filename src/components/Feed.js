import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';


const Feed = ({ events, updateEvents, setEvents }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
      };
    
      const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        details: '',
      });
    
      const handleAddEvent = () => {
        const { title, date, details } = newEvent;
      
        if (title && date) {
          const formattedEvent = {
            id: `event${events.length + 1}`, // Generate a unique ID for the event
            title,
            start: new Date(date), // Convert date string to Date object
            end: new Date(date), // Assuming the event ends on the same day
            extendedProps: {
              details,
            },
          };
      
          // Update the events array by adding the new event
          const updatedEvents = [...events, formattedEvent];
          // Call setEvents to update the state with the new events array
          setEvents(updatedEvents);
          // Reset the newEvent state for the next event
          setNewEvent({ title: '', date: '', details: '' });
        } else {
          alert('Please fill in both title and date fields.');
        }
      };
    
      const handleDeleteEvent = (eventToDelete) => {
        const userConfirmation = window.confirm("Are you sure you want to delete this event?");
    
        if (userConfirmation) {
          const updatedEvents = events.filter((event) => event.id !== eventToDelete.event.id);
          updateEvents(updatedEvents);
        }
      };
    
  return (
    <div>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} />
      </div>
      <div>
        <label>Event Details:</label>
        <input type="text" name="details" value={newEvent.details} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddEvent}>Add Event</button>

      
      <FullCalendar
        plugins={[listPlugin]}
        initialView="listYear"
        events={events}
        headerToolbar={{
          left: 'prev,next', // Remove 'today'
          center: 'title',
          right: '',
        }}
        eventContent={(arg) => (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <b>{arg.event.title}</b>
                <p>{arg.event.extendedProps.details}</p>
              </div>
              <button onClick={() => handleDeleteEvent(arg)}>Delete</button>
            </div>
          </>
        )}
        eventDidMount={(arg) => {
          // Remove the "all-day" label
          const timeEl = arg.el.querySelector('.fc-list-event-time');
          if (timeEl) {
            timeEl.style.display = 'none';
          }
        }}
      />
    </div>
  );
}
export default Feed;