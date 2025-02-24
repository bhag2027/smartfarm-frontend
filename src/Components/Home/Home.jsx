import React from 'react'
import './Home.css'
import NavBar from '../Navbar/NavBar'
const Home = () => {
  return (
    <div>
      <NavBar/>
   
    <div className='hero'>
    <div className='hero-text'>
       <h3>
        Find Everything You Need For Your Poultry Farm
       </h3>
        <p>
        "Our dedicated team ensures a smooth and efficient experience, delivering exceptional results you can count on every time." </p><br></br>
        <button className='btn'>Explore More </button>
    
    </div>
    </div>
    </div>
  )
}

export default Home