import React from 'react';
import './About.css'; 
import KLN1 from '../Images/KLN1.jpeg';
import KLN5 from '../Images/KLN5.jpeg';
import KLN from '../Images/KLN.jpeg';

const About = () => {
  return (
    <div className="about-container">
      <h1>About KLN Food Court</h1>
      <div className="about-content">
        <div className="text-content">
          <p>
            Welcome to KLN Food Court, where we offer a delightful dining experience for food lovers.
            Our restaurant is dedicated to serving a wide variety of delicious dishes that cater to
            all tastes and preferences. Whether you're in the mood for spicy South Indian cuisine or
            savory North Indian delicacies, we have something for everyone.
          </p>
          <p>
            At KLN Food Court, we believe in using only the freshest ingredients to prepare our meals.
            Our talented chefs are passionate about creating flavorful dishes that will leave you coming
            back for more. We take pride in our warm hospitality and strive to provide a welcoming
            atmosphere for our guests.
          </p>
          <p>
            Join us for an unforgettable culinary journey at KLN Food Court. We look forward to serving
            you soon!
          </p>
        </div>
        <div className="image-gallery">
          <img src={KLN1} alt="Dining Area" />
          <img src={KLN5} alt="Delicious Dishes" />
          <img src={KLN} alt="Chef in Action" />
        </div>
      </div>

      {/* Contact Details */}
      <div className="contact-details">
        <h2>Contact Us</h2>
        <p>Email: klnfoodcourt@gmail.com</p>
        <p>Phone: 9989123680</p>
        <div className="social-media">
          <a href="https://www.instagram.com/klnfoodcourt" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://www.facebook.com/klnfoodcourt" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
