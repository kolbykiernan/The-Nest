import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';



const CategoryForm = ({categories, fetchCategories}) => {
  const [categoryName, setCategoryName] = useState('');
  console.log('fetchCategories prop:', fetchCategories);

  const handleFormSubmit = async () => {


    try {
      await axios.post(`https://welcome-to-the-nest.onrender.com/api/category`, { name: categoryName });
      fetchCategories();
      setCategoryName('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
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
          <DropdownButton
            title=""
            variant="outline-secondary"
            align="end"
            className="category-dropdown"
          >
           {categories && categories.map((category, idx) => (
              <Dropdown.Item key={idx}>
                {category.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
        <div className="category-button-container">
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
