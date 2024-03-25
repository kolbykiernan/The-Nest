import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CategoryDropdown from './CategoryDropdown';
import axios from 'axios';


const Groomsmen = ({ categories, handleAnswer }) => {
    
  const [rowsGroomsmen, setRowsGroomsmen] = useState(Array.from({ length: 10 }, () => ({
    firstName: '',
    lastName: '',
    plusOneSelectedGroomsmen: '',
    plusOneFirstName: '',
    plusOneLastName: '',
    selectedRole: '',
    plusOneValueGroomsmen: 1,
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
    setRowsGroomsmen(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('firstName', value, index, nameType);
  };

  const handleLastNameChange = (value, index, nameType) => {
    setRowsGroomsmen(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('lastName', value, index, nameType);
  };

  const handlePlusOneSelectChangeGroomsmen = (index, value) => {
    // setPlusOneSelectedGroomsmen(value);
    setRowsGroomsmen(prevRowsGroomsmen => {
      const updatedRowsGroomsmen = [...prevRowsGroomsmen];
      updatedRowsGroomsmen[index] = { ...updatedRowsGroomsmen[index], plusOneSelectedGroomsmen: value === 'Yes' };
      return updatedRowsGroomsmen;
    });
    handleAnswer('plusOneSelectedGroomsmen', value, index)
  };

  const handlePlusOneFirstNameChange = (value, index, nameType) => {
    setRowsGroomsmen(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('plusOneFirstName', value, index, nameType);
  };

  const handlePlusOneLastNameChange = (value, index, nameType) => {
    setRowsGroomsmen(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('plusOneLastName', value, index, nameType);
  };

  const isAlsoInWeddingParty = (value, role, index) => {
    setRowsGroomsmen(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], selectedRole: role };
      return updatedRows;
    });
    handleAnswer('alsoInWeddingParty', value);
  };

  const handlePlusOneValueChange = (value, index) => {
    setRowsGroomsmen(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        plusOneValueGroomsmen: parseFloat(value)
      };
      return updatedRows;
    });
  };

  const addRowGroomsmen = () => {
    setRowsGroomsmen(prevRowsGroomsmen => {
      const newRow = { plusOneSelectedGroomsmen: '' };
      return [...prevRowsGroomsmen, newRow];
    });
  };

const submitGroomsmen = async () => {
  try {
  
    for (let i = 0; i < rowsGroomsmen.length; i++) {
      if (rowsGroomsmen[i].firstName || rowsGroomsmen[i].lastName) {
        const formData = {
          firstName: rowsGroomsmen[i].firstName,
          lastName: rowsGroomsmen[i].lastName,
          selectedCategory: selectedCategories[i],
          plusOneSelectedGroomsmen: rowsGroomsmen[i].plusOneSelectedGroomsmen,
          plusOneFirstName: rowsGroomsmen[i].plusOneFirstName,
          plusOneLastName: rowsGroomsmen[i].plusOneLastName,
          isAlsoInWeddingParty: rowsGroomsmen[i].selectedRole,
          plusOneValueGroomsmen: rowsGroomsmen[i].plusOneValueGroomsmen
        };

        const response = await axios.post('http://localhost:3000/api/groomsmen', formData);
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
            {rowsGroomsmen.map((row, index) => (
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
                    title={row.plusOneSelectedGroomsmen ? 'Yes' : (row.plusOneSelectedGroomsmen === false ? 'No' : 'Select One')}
                    onSelect={(value) => handlePlusOneSelectChangeGroomsmen(index, value)}
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
                    disabled={!row.plusOneSelectedGroomsmen || row.plusOneSelectedGroomsmen === 'No'}
                    value={row.plusOneFirstName} 
                    onChange={(e) => handlePlusOneFirstNameChange(e.target.value, index, 'plusOneFirstName')}
                  />
                </td>
                <td>
                  <Form.Control 
                    type="text" 
                    disabled={!row.plusOneSelectedGroomsmen || row.plusOneSelectedGroomsmen === 'No'}
                    value={row.plusOneLastName} 
                    onChange={(e) => handlePlusOneLastNameChange(e.target.value, index, 'plusOneLastName')}
                  />
                </td>
                <td>
                <Form.Check
                    type="checkbox"
                    label="bridesmaid"
                    className="form-margins"
                    disabled={!row.plusOneSelectedGroomsmen || row.plusOneSelectedGroomsmen === 'No'}
                    value="bridesmaid"
                    onChange={() => isAlsoInWeddingParty('bridesmaid', 'bridesmaid', index)}
                />
                <Form.Check
                    type="checkbox"
                    label="groomsmen"
                    disabled={!row.plusOneSelectedGroomsmen || row.plusOneSelectedGroomsmen === 'No'}
                    value="groomsmen"
                    onChange={() => isAlsoInWeddingParty('groomsmen', 'groomsmen', index)}
                />
                </td>
                <td>
                  <Form.Range 
                    min={1} 
                    max={5} 
                    step={0.5} 
                    disabled={!row.plusOneSelectedGroomsmen || row.plusOneSelectedGroomsmen === 'No'}
                    value={row.plusOneValueGroomsmen} 
                    onChange={(e) => handlePlusOneValueChange(e.target.value, index)}
                  />
                  <p>Selected Value: {row.plusOneValueGroomsmen}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <Button className='add-row-button' onClick={addRowGroomsmen}>Add Row</Button>
          <Button className='add-row-button' onClick={submitGroomsmen}>Submit Groomsmen</Button>
        </div>
      </Form>
    </div>
  );
}

export default Groomsmen;