import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
// import CategoryDropdown from './CategoryDropdown';

const CategoryDropdown = (categories, isDropdown, onChange, index) => {
  if (isDropdown) {
    return (
      <DropdownButton
        title=""
        variant="outline-secondary"
        id={`category-dropdown-${index}`}
        align="end"
        className="category-dropdown"
      >
        {categories.map((category, idx) => (
          <Dropdown.Item key={idx} onClick={() => onChange(category.name, index)}>
            {category.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  } else {
    return (
      <DropdownButton
        className="category-select"
        variant="outline-secondary"
        align="end"
        onChange={(e) => onChange(e.target.value, index)}
      >
        {categories.map((category, idx) => (
          <Dropdown.Item key={idx} value={category.name}>
            {category.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  }
};


const CategoryForm = ({categories, fetchCategories}) => {
  const [categoryName, setCategoryName] = useState('');
  

  const handleFormSubmit = async (e) => {

    try {

      await axios.post('http://localhost:3000/api/categories', { name: categoryName });
      fetchCategories();
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
          <CategoryDropdown 
            categories={categories} 
            isDropdown={true} 
            // onChange={(name, index) => handleDropdownChange(name, index)}
          />
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
