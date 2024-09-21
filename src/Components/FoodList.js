import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FoodList.css'; 
const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [errors, setErrors] = useState({});
  const [editingFood, setEditingFood] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:8080/foods/all');
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching foods:', error);
        setErrors({ fetch: 'Error fetching foods. Please try again later.' });
      }
    };

    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/foods/delete/${id}`);
      setFoods(foods.filter((food) => food.id !== id));
    } catch (error) {
      console.error('Error deleting food item:', error);
      setErrors({ delete: 'Error deleting food item. Please try again later.' });
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/foods/update/${formData.id}`, formData);
      setFoods(foods.map((food) => (food.id === formData.id ? formData : food)));
      setEditingFood(null);
    } catch (error) {
      console.error('Error updating food item:', error);
      setErrors({ update: 'Error updating food item. Please try again later.' });
    }
  };

  return (
    <div className="custom-food-list">
      <h2>Food Items</h2>
      {errors.fetch && <p className="custom-error">{errors.fetch}</p>}
      
      {errors.update && <p className="custom-error">{errors.update}</p>}

      {editingFood ? (
        <form className="custom-edit-form" onSubmit={handleSubmit}>
          <h3>Edit Food Item</h3>
          <div className="custom-edit-form-grid-expanded">
            <label>
              Name:
              <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
            </label>
            <label>
              Price:
              <input type="number" name="price" value={formData.price || ''} onChange={handleChange} />
            </label>
            <label>
              State GST:
              <input type="number" name="stateGST" value={formData.stateGST || ''} onChange={handleChange} />
            </label>
            <label>
              Central GST:
              <input type="number" name="centralGST" value={formData.centralGST || ''} onChange={handleChange} />
            </label>
            <label>
              Total GST:
              <input type="number" name="totalGST" value={formData.totalGST || ''} onChange={handleChange} />
            </label>
            <label>
              Total Price:
              <input type="number" name="totalPrice" value={formData.totalPrice || ''} onChange={handleChange} />
            </label>
            <label>
              Description:
              <textarea name="description" value={formData.description || ''} onChange={handleChange} />
            </label>
            <label>
              Category:
              <input type="text" name="categoryName" value={formData.categoryName || ''} onChange={handleChange} />
            </label>
          </div>
          <button type="submit" className="custom-save-button">Save</button>
          <button type="button" className="custom-cancel-button" onClick={() => setEditingFood(null)}>Clear</button>
        </form>
      ) : (
        <table className="custom-food-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>State GST</th>
              <th>Central GST</th>
              <th>Total GST</th>
              <th>Total Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food.id}>
                <td>
                  <img src={food.imageUrl} alt={food.name} className="custom-food-image" />
                </td>
                <td>{food.name}</td>
                <td>{food.price}</td>
                <td>{food.stateGST}</td>
                <td>{food.centralGST}</td>
                <td>{food.totalGST}</td>
                <td>{food.totalPrice}</td>
                <td>{food.description}</td>
                <td>{food.categoryName || 'Unknown'}</td>
                <td>
                 
                  <button className="custom-delete-button" onClick={() => handleDelete(food.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FoodList;
