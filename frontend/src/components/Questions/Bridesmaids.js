import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CategoryDropdown from './CategoryDropdown';
import axios from 'axios';


const Bridesmaids = ({ categories, handleAnswer }) => {
    
  const [rowsBridesmaids, setRowsBridesmaids] = useState(Array.from({ length: 10 }, () => ({
    firstName: '',
    lastName: '',
    plusOneSelectedBridesmaids: '',
    plusOneFirstName: '',
    plusOneLastName: '',
    selectedRole: '',
    plusOneValueBridesmaids: 1,
})));
const [selectedCategories, setSelectedCategories] = useState(Array.from({ length: 10 }, () => ''));

const selectCategory = (value, index, categoryType) => {
  setSelectedCategories(prevCategories => {
    const updatedCategories = [...prevCategories];
    updatedCategories[index] = value;
    return updatedCategories;
  });
  handleAnswer(categoryType, value, index);
}

  const handleFirstNameChange = (value, index, nameType) => {
    setRowsBridesmaids(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('firstName', value, index, nameType);
  };

  const handleLastNameChange = (value, index, nameType) => {
    setRowsBridesmaids(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('lastName', value, index, nameType);
  };

  const handlePlusOneSelectChangeBridesmaids = (index, value) => {
    // setPlusOneSelectedBridesmaids(value);
    setRowsBridesmaids(prevRowsBridesmaids => {
      const updatedRowsBridesmaids = [...prevRowsBridesmaids];
      updatedRowsBridesmaids[index] = { ...updatedRowsBridesmaids[index], plusOneSelectedBridesmaids: value === 'Yes' };
      return updatedRowsBridesmaids;
    });
    handleAnswer('plusOneSelectedBridesmaids', value, index)
  };

  const handlePlusOneFirstNameChange = (value, index, nameType) => {
    setRowsBridesmaids(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('plusOneFirstName', value, index, nameType);
  };

  const handlePlusOneLastNameChange = (value, index, nameType) => {
    setRowsBridesmaids(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('plusOneLastName', value, index, nameType);
  };

  const isAlsoInWeddingParty = (value, role, index) => {
    setRowsBridesmaids(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], selectedRole: role };
      return updatedRows;
    });
    handleAnswer('alsoInWeddingParty', value);
  };

  const handlePlusOneValueChange = (value, index) => {
    setRowsBridesmaids(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        plusOneValueBridesmaids: parseFloat(value)
      };
      return updatedRows;
    });
  };

  const addRowBridesmaids = () => {
    setRowsBridesmaids(prevRowsBridesmaids => {
      const newRow = { plusOneSelectedBridesmaids: '' };
      return [...prevRowsBridesmaids, newRow];
    });
  };

const submitBridesmaids = async () => {
  try {
  
    for (let i = 0; i < rowsBridesmaids.length; i++) {
      if (rowsBridesmaids[i].firstName || rowsBridesmaids[i].lastName) {
        const formData = {
          firstName: rowsBridesmaids[i].firstName,
          lastName: rowsBridesmaids[i].lastName,
          selectedCategory: selectedCategories[i],
          plusOneSelectedBridesmaids: rowsBridesmaids[i].plusOneSelectedBridesmaids,
          plusOneFirstName: rowsBridesmaids[i].plusOneFirstName,
          plusOneLastName: rowsBridesmaids[i].plusOneLastName,
          isAlsoInWeddingParty: rowsBridesmaids[i].selectedRole,
          plusOneValueBridesmaids: rowsBridesmaids[i].plusOneValueBridesmaids
        };

        const response = await axios.post('http://localhost:3000/api/bridesmaids', formData);
        console.log('Form submitted successfully for row', i+1, ':', response.data);
      }
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

  return (
    <div className='wedding-party-form'>
      <Form>
        <Table responsive="sm">
          <thead className='table-head'>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Category</th>
              <th>Plus One / Significant Other?</th>
              <th>Plus One First Name</th>
              <th>Plus One Last Name</th>
              <th>Check if plus one is also in a wedding party</th>
              <th>How important is it that the plus-one comes?</th>
            </tr>
          </thead>
          <tbody>
            {rowsBridesmaids.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <Form.Control 
                      type="text" 
                      value={row.firstName} 
                      onChange={(e) => handleFirstNameChange(e.target.value, index, 'firstName')}
                    />
                </td>
                <td>
                    <Form.Control 
                      type="text" 
                      value={row.lastName} 
                      onChange={(e) => handleLastNameChange(e.target.value, index, 'lastName')}
                    />
                </td>
                <td>
                  <Dropdown>
                    <CategoryDropdown 
                      index={index}
                      categories={categories} 
                      selectedCategories={selectedCategories} 
                      onChange={(value) => selectCategory(value, index, 'selectedCategory')}
                      isDropdown={false} 
                      className="category-select" 
                    />
                  </Dropdown>
                </td>
                <td>
                  <DropdownButton 
                    variant="outline-secondary" 
                    title={row.plusOneSelectedBridesmaids ? 'Yes' : (row.plusOneSelectedBridesmaids === false ? 'No' : 'Select One')}
                    onSelect={(value) => handlePlusOneSelectChangeBridesmaids(index, value)}
                  >
                    <Dropdown.Item 
                      eventKey="Yes"
                      >Yes
                    </Dropdown.Item>
                    <Dropdown.Item 
                      eventKey="No">
                        No
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
                <td>
                  <Form.Control 
                    type="text" 
                    disabled={!row.plusOneSelectedBridesmaids || row.plusOneSelectedBridesmaids === 'No'}
                    value={row.plusOneFirstName} 
                    onChange={(e) => handlePlusOneFirstNameChange(e.target.value, index, 'plusOneFirstName')}
                  />
                </td>
                <td>
                  <Form.Control 
                    type="text" 
                    disabled={!row.plusOneSelectedBridesmaids || row.plusOneSelectedBridesmaids === 'No'}
                    value={row.plusOneLastName} 
                    onChange={(e) => handlePlusOneLastNameChange(e.target.value, index, 'plusOneLastName')}
                  />
                </td>
                <td>
                <Form.Check
                    type="checkbox"
                    label="bridesmaid"
                    className="form-margins"
                    disabled={!row.plusOneSelectedBridesmaids || row.plusOneSelectedBridesmaids === 'No'}
                    value="bridesmaid"
                    onChange={() => isAlsoInWeddingParty('bridesmaid', 'bridesmaid', index)}
                />
                <Form.Check
                    type="checkbox"
                    label="groomsmen"
                    disabled={!row.plusOneSelectedBridesmaids || row.plusOneSelectedBridesmaids === 'No'}
                    value="groomsmen"
                    onChange={() => isAlsoInWeddingParty('groomsmen', 'groomsmen', index)}
                />
                </td>
                <td>
                  <Form.Range 
                    min={1} 
                    max={5} 
                    step={0.5} 
                    disabled={!row.plusOneSelectedBridesmaids || row.plusOneSelectedBridesmaids === 'No'}
                    value={row.plusOneValueBridesmaids} 
                    onChange={(e) => handlePlusOneValueChange(e.target.value, index)}
                  />
                  <p>Selected Value: {row.plusOneValueBridesmaids}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <Button className='add-row-button' onClick={addRowBridesmaids}>Add Row</Button>
          <Button className='add-row-button' onClick={submitBridesmaids}>Submit Bridesmaids</Button>
        </div>
      </Form>
    </div>
  );
}

export default Bridesmaids;