import React, { useState } from 'react';
import '../HomePage.css'; // Import your CSS file

const HomePage = ({ events }) => {
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('Peggy');
  const [backgroundImage, setBackgroundImage] = useState("../public/placeholder.jpeg"); // Default background image

  
  const handleEditName = () => {
    setEditingName(true);
  };

  const handleSaveName = () => {
    setEditingName(false);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBackgroundImage(reader.result); // Set uploaded image as background
      };
      reader.readAsDataURL(file);
    }
  };

  const Greetings = () => {
    let myDate = new Date();
    let hours = myDate.getHours();
    let greet;

    if (hours < 12) greet = "morning";
    else if (hours >= 12 && hours <= 17) greet = "afternoon";
    else if (hours >= 17 && hours <= 24) greet = "evening";

    return greet;
  };

  return (
    <div>
      {/* Circular shape above "Welcome Peggy" */}
      <div className="profile-section">
        <div className="circle" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        <div className="edit-profile">
          <button onClick={handleSaveName}>Save Name</button>
        </div>
      </div>
      <h1>
        <span>Good {Greetings()}, </span>
        {editingName ? (
          <input type="text" value={newName} onChange={handleNameChange} />
        ) : (
          newName
        )},
      </h1>
      {editingName ? (
        <button onClick={handleSaveName}>Save Name</button>
      ) : (
        <button onClick={handleEditName}>Edit Name</button>
      )}

      {/* Upload photo button */}
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
    </div>
  );
}

export default HomePage;
