import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Item.css';

const Item = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stateGST: 0,
    centralGST: 0,
    totalGST: 0,
    totalPrice: 0,
    description: '',
    imageUrl: '',
    categoryName: ''
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories/all');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Fetch categories only once on component mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const updatedData = { ...prevFormData, [name]: value };

      const stateGST = parseFloat(updatedData.stateGST) || 0;
      const centralGST = parseFloat(updatedData.centralGST) || 0;
      const price = parseFloat(updatedData.price) || 0;

      const totalGST = stateGST + centralGST;
      const totalPrice = price + totalGST;

      return {
        ...updatedData,
        totalGST,
        totalPrice
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/foods/create', formData);

      console.log('Response:', response.data);

      setMessage('Food item added successfully!');
      setFormData({
        name: '',
        price: 0,
        stateGST: 0,
        centralGST: 0,
        totalGST: 0,
        totalPrice: 0,
        description: '',
        imageUrl: '',
        categoryName: ''
      });
    } catch (error) {
      console.error('Error adding food item:', error);
      setMessage('Failed to add food item.');
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      price: 0,
      stateGST: 0,
      centralGST: 0,
      totalGST: 0,
      totalPrice: 0,
      description: '',
      imageUrl: '',
      categoryName: ''
    });
    setMessage('');
  };

  return (
    <div className="item-form-container">
      <h2>Add New Food Item</h2>
      <form onSubmit={handleSubmit} className="item-form">
        <div className="item-form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>

        <div className="item-form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required />
        </div>

        <div className="item-form-group">
          <label htmlFor="stateGST">State GST:</label>
          <input type="number" id="stateGST" name="stateGST" value={formData.stateGST} onChange={handleInputChange} required />
        </div>

        <div className="item-form-group">
          <label htmlFor="centralGST">Central GST:</label>
          <input type="number" id="centralGST" name="centralGST" value={formData.centralGST} onChange={handleInputChange} required />
        </div>

        <div className="item-form-group">
          <label htmlFor="totalGST">Total GST:</label>
          <input type="number" id="totalGST" name="totalGST" value={formData.totalGST} readOnly />
        </div>

        <div className="item-form-group">
          <label htmlFor="totalPrice">Total Price:</label>
          <input type="number" id="totalPrice" name="totalPrice" value={formData.totalPrice} readOnly />
        </div>

        <div className="item-form-group">
          <label htmlFor="categoryName">Category:</label>
          <select id="categoryName" name="categoryName" value={formData.categoryName} onChange={handleInputChange} required>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="item-form-group item-description">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
        </div>

        <div className="item-form-group item-image-url">
          <label htmlFor="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required />
        </div>

        <button type="submit" className="item-submit-button">Add</button>
        <button type="button" onClick={handleClear} className="item-clear-button">Clear</button>
      </form>

      {message && <p className="item-message">{message}</p>}
    </div>
  );
};

export default Item;
