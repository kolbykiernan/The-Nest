import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data); // Assuming the response contains an array of categories
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend to add the new category
      await axios.post('/api/categories', { name: categoryName });
      // Refresh the list of categories after adding a new one
      fetchCategories();
      // Clear the input field
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit} className='category-form'>
        <InputGroup>
            <Form.Control 
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className='category-input'
            />
            <DropdownButton 
                title=""
                variant="outline-secondary"
                id="input-group-dropdown-2"
                align="end"
            >
                {categories.map((category) => (
                    <Dropdown.Item key={category.id}>{category.name}</Dropdown.Item>
                ))}
            </DropdownButton>
        </InputGroup>
      <Button style={{ backgroundColor: 'var(--primary-color)'}} className="category-button" variant="secondary" type="submit">Add Category</Button>
    </Form>

     
      
      
    </div>
  );
};

export default CategoryForm;
