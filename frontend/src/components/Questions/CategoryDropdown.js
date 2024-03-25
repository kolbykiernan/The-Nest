import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';


const CategoryDropdown = ({ categories, isDropdown, onChange, selectedCategories, index }) => {

  const handleSelectionChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue, index, 'selectedCategory');
  }

  if (isDropdown) {
    return (
      <DropdownButton
        title=""
        variant="outline-secondary"
        id="input-group-dropdown-2"
        align="end"
        className="category-dropdown"
      >
        {categories.map((category) => (
          <Dropdown.Item key={category.id} eventKey={category.id}>{category.name}</Dropdown.Item>
        ))}
      </DropdownButton>
    );
  } else {
    return (
      <Form.Select  
        className="category-select"
        value={selectedCategories[index] || ""}
        onChange={(e) => handleSelectionChange(e)}  
      >
        <option value="">Select a category</option>
          {categories.map((category) => (
        <option key={category.id} value={category.name}>{category.name}</option>
          ))}
      </Form.Select>
    );
  }
};

export default CategoryDropdown;