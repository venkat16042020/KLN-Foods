import React, { useState } from 'react';
import axios from 'axios';
import'./AddRestaurent.css';

const AddRestaurant = () => {
    const [restaurant, setRestaurant] = useState({
        name: '',
        description: '',
        phoneNumber: '',
        openingHours: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRestaurant((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new URLSearchParams();
        for (const key in restaurant) {
            formData.append(key, restaurant[key]);
        }

        axios.post('http://localhost:8080/api/restaurants/create', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            console.log('Restaurant added successfully:', response.data);
            setRestaurant({
                name: '',
                description: '',
                phoneNumber: '',
                openingHours: '',
                imageUrl: ''
            });
        })
        .catch(error => {
            console.error('Error adding restaurant:', error.response?.data || error.message);
        });
    };

    const handleClear = () => {
        setRestaurant({
            name: '',
            description: '',
            phoneNumber: '',
            openingHours: '',
            imageUrl: ''
        });
    };

    return (
        <div className="add-restaurant-container">
            <h2>Add a New Restaurant</h2>
            <form className="add-restaurant-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={restaurant.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={restaurant.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={restaurant.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="openingHours">Opening Hours:</label>
                    <input
                        type="text"
                        id="openingHours"
                        name="openingHours"
                        value={restaurant.openingHours}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={restaurant.imageUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="add-restaurant-buttons">
                    <button type="submit" className="submit-button">Add Restaurant</button>
                    <button type="button" onClick={handleClear} className="clear-button">Clear</button>
                </div>
            </form>
        </div>
    );
};

export default AddRestaurant;
