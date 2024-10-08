import React, { useState } from 'react';
import axios from 'axios';
import './Category.css';

const Category = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.description) {
      errors.description = "Description is required";
    }
    if (!formData.imageUrl) {
      errors.imageUrl = "Image URL is required";
    } else if (!formData.imageUrl.startsWith("http")) {
      errors.imageUrl = "Image URL must start with 'http'";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

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
      setFormErrors({}); // Clear errors after successful submit
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="category-container">
      <h2>Category Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
          />
          {formErrors.name && <span className="error-text">{formErrors.name}</span>}
        </div>
        <div className="form-row">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description"
          />
          {formErrors.description && <span className="error-text">{formErrors.description}</span>}
        </div>
        <div className="form-row">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
          {formErrors.imageUrl && <span className="error-text">{formErrors.imageUrl}</span>}
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Category;
