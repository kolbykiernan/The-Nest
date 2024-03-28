import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import CategoryDropdown from './CategoryDropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';




const CategoryForm = ({categories, fetchCategories}) => {
  const [categoryName, setCategoryName] = useState('');
  

  const handleFormSubmit = async (e) => {

    try {
      // Send a POST request to the backend to add the new category
      await axios.post('http://localhost:3000/api/categories', { name: categoryName });
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
      <div className='category-form'>
        <div className='category-input-dropdown'>
          <InputGroup className="parent-input-group">
            <Form.Control 
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className='category-input'
            />
          </InputGroup>
          <CategoryDropdown categories={categories} isDropdown={true}/>
        </div>
        <Button
          style={{ backgroundColor: 'var(--primary-color)' }}
          className="category-button"
          variant="secondary"
          type="submit"
          onClick={handleFormSubmit}
        >
        Add Category
        </Button>
      </div>
    </div>
  );
};

export default CategoryForm;
