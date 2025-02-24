import React from 'react';
import Nav from './Nav';
import farm2 from '../../assets/farm2.jpg';
const Vendordashboard = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${farm2})`, // replace with your image path
        backgroundSize: 'cover', // ensures the image covers the entire background
        backgroundPosition: 'center', // centers the background image
        height: '100vh', // makes the background cover the whole viewport
        width: '100%', 
      }}
    >
      <Nav />
    </div>
  );
};

export default Vendordashboard;
