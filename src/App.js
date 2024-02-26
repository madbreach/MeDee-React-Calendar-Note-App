import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import  ProfilePage  from "./components/ProfilePage";
import  ProfileDetailPage from "./components/ProfileDetailPage";
import  Feed  from "./components/Feed";
import HomePage from "./components/HomePage";

const App = () => {
  const [events, setEvents] = useState([
    {
      id: 'event1',
      title: 'Event 1',
      start: '2024-01-15',
      end: '2024-01-15',
      extendedProps: {
        details: 'Event 1 Details',
      },
    },
    // Add more events as needed
  ]);

  const updateEvents = (newEvents) => {
    setEvents(newEvents);
  };  
  
  return (
    <div>
      <Router>
        <ul>
          <li>
            <Link to="/">To Home</Link>
          </li>
          <li>
            <Link to="/profile">To Profile</Link>
          </li>
          <li>
            <Link to="/profile/andrew" exact>
              To Andrew's Profile
            </Link>
          </li>
          <li>
            <Link to="/feed">To Feed</Link>
          </li>
        </ul>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:username" element={<ProfileDetailPage />} />
        <Route path="/feed" element={<Feed events={events} updateEvents={updateEvents} setEvents={setEvents}/>} />
          {/* Circular shape above "Welcome Peggy" 
          <Route exact path="/" component={HomePage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route path="/profile/:username" component={ProfileDetailPage} />
          <Route path="/feed" component={Feed} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;