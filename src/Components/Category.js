import React, { useState } from 'react';
import axios from 'axios';
import './Category.css';

const Category = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '', 
  });

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('description', formData.description);
      params.append('imageUrl', formData.imageUrl);

     
      const response = await axios.post('http://localhost:8080/categories/create', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log('Form submitted successfully:', response.data);
     
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      
    }
  };

  return (
    <div className="category-container">
      <h2>Category Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description"
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Category;
