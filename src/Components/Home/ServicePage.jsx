import React from 'react';
import NavBar from '../Navbar/NavBar'; // Assuming NavBar is located in the "Navbar" folder
import chick2 from '../../assets/chick2.jpg'; // Update with your actual image path

const ServicePage = () => {
  const pageStyle = {
    backgroundImage: `url(${chick2})`, // Background image path
    backgroundSize: 'cover',  // Make the image cover the entire background
    backgroundPosition: 'center',  // Center the background image
    padding: '20px',  // Page padding
    minHeight: '100vh',  // Ensure full viewport height
  };

  const sectionStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // White background with transparency
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',  // Slight shadow for card effect
  };

  const textStyle = {
    flex: '1',
    paddingRight: '20px',
  };

  const imageStyle = {
    flex: '1',
    maxWidth: '400px',
    borderRadius: '8px',
  };

  const headingStyle = {
    color: 'blue',
    textAlign: 'center',
    marginBottom: '30px',
  };

  return (
    <div style={pageStyle}>
     
      <NavBar /> {/* Include NavBar component here */}
      <br></br> <br></br>
      <h1 style={headingStyle}>Our Poultry Farm Services</h1>
      
      <section style={sectionStyle}>
        <div style={textStyle}>
          <h2>Comprehensive Farm Management</h2>
          <p>
            Our Poultry Farm Management platform provides farmers with all the tools they need to manage their farms effectively. With easy access to booking chicks, feed, and medicines, our platform simplifies day-to-day operations.
          </p>
          <p>
            You can view available products from vendors, book them, and track deliveries right from your dashboard. Whether you are a small-scale farmer or managing large operations, our system is designed to handle every aspect of poultry farming.
          </p>
        </div>
        {/* <img style={imageStyle} src="/path/to/farm-management-image.jpg" alt="Farm Management" /> */}
      </section>

      <section style={sectionStyle}>
        <div style={textStyle}>
          <h2>Chick Booking</h2>
          <p>
            Booking chicks has never been easier. Simply browse through available stocks from various vendors and place an order directly through the system. You can manage your bookings, track delivery statuses, and even return grown chickens to vendors when needed.
          </p>
          <p>
            Stay updated on the latest chick prices through our daily rate posting feature, ensuring you always make informed decisions.
          </p>
        </div>
        {/* <img style={imageStyle} src="/path/to/chick-booking-image.jpg" alt="Chick Booking" /> */}
      </section>

      <section style={sectionStyle}>
        <div style={textStyle}>
          <h2>Feed & Medicine Management</h2>
          <p>
            Feeding your flock properly is crucial for healthy poultry. Our platform allows farmers to book high-quality feed and medicines from trusted vendors. Track stock levels, schedule purchases, and ensure your poultry is well taken care of.
          </p>
          <p>
            With access to veterinary consultations, you can also seek expert advice when your flock shows signs of illness.
          </p>
        </div>
        {/* <img style={imageStyle} src="/path/to/feed-management-image.jpg" alt="Feed Management" /> */}
      </section>

      <section style={sectionStyle}>
        <div style={textStyle}>
          <h2>Vendor Services</h2>
          <p>
            As a vendor, our platform provides a seamless way to manage your inventory and receive orders. You can list products such as chicks, feed, and medicines, allowing farmers to book and purchase from your stock directly.
          </p>
          <p>
            With the ability to approve or reject farmer bookings and track payments, our system makes it easy to manage large-scale transactions.
          </p>
        </div>
        {/* <img style={imageStyle} src="/path/to/vendor-services-image.jpg" alt="Vendor Services" /> */}
      </section>

      <section style={sectionStyle}>
        <div style={textStyle}>
          <h2>Daily Market Rate Updates</h2>
          <p>
            Stay informed with daily market rate updates for chicks, feed, and poultry products. This feature ensures that both farmers and vendors are always aware of the latest pricing trends, helping them make the best business decisions.
          </p>
          <p>
            Admins can upload new rates each day, providing a centralized source of information for all users of the platform.
          </p>
        </div>
        {/* <img style={imageStyle} src="/path/to/daily-rate-update-image.jpg" alt="Daily Rate Updates" /> */}
      </section>
    </div>
  );
};

export default ServicePage;
