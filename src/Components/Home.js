// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Slider from 'react-slick'; // Import Slick Slider component
// import 'slick-carousel/slick/slick.css'; // Import Slick Slider CSS
// import 'slick-carousel/slick/slick-theme.css'; // Import Slick Slider Theme CSS
// import './Home.css'; // Import your CSS file for styling

// const Home = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Fetch categories from the backend
//     axios.get('http://localhost:8080/categories/all')
//       .then(response => {
//         setCategories(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

//   // Slider settings
//   const settings = {
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     arrows: true,
//     dots: true,
//     infinite: true,
//   };

//   return (
//     <div className="home-container">
//       <img
//         src="https://cdn.pixabay.com/photo/2024/04/23/09/33/ai-generated-8714546_960_720.jpg"
//         alt="India"
//         className="home-image"
//       />
//       <div className="overlay">
//         <h1 className="title">KLN Foods</h1>
//         <p className="quote">"Good food is the foundation of genuine happiness."</p>
//       </div>

//       {/* Add "Top Items" text */}
//       <h2 className="top-items-text">Top Items</h2>

//       <div className="categories-slider">
//         <Slider {...settings}>
//           {categories.map(category => (
//             <div key={category.category_id} className="category-item">
//               <img src={category.imageUrl} alt={category.name} className="category-image" />
//               <h2 className="category-name">{category.name}</h2>
//               {/* <p className="category-description">{category.description}</p> */}
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default Home;


// src/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick'; // Import Slick Slider component
import 'slick-carousel/slick/slick.css'; // Import Slick Slider CSS
import 'slick-carousel/slick/slick-theme.css'; // Import Slick Slider Theme CSS
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Home.css'; // Import your CSS file for styling

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend
    axios.get('http://localhost:8080/categories/all')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Slider settings
  const settings = {
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    
    dots: true,
    infinite: true,
  };

  return (
    <div className="home-container">
      <img
        src="https://cdn.pixabay.com/photo/2024/04/23/09/33/ai-generated-8714546_960_720.jpg"
        alt="India"
        className="home-image"
      />
      <div className="overlay">
        <h1 className="title">KLN Foods</h1>
        <p className="quote">"Good food is the foundation of genuine happiness."</p>
      </div>

      
      <h2 className="top-items-text">Top Items</h2>

      <div className="categories-slider">
        <Slider {...settings}>
          {categories.map(category => (
            <Link
              key={category.category_id}
              to={`/cart?category=${category.name}`}
              className="category-link" // Add a class for styling if needed
            >
              <div className="category-item">
                <img src={category.imageUrl} alt={category.name} className="category-image" />
                <h2 className="category-name">{category.name}</h2>
                {/* <p className="category-description">{category.description}</p> */}
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
