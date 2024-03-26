import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CategoryDropdown from './CategoryDropdown';
import axios from 'axios';


const EverybodyElse = ({ categories, handleAnswer }) => {
    
  const [rowsEverybodyElse, setRowsEverybodyElse] = useState(Array.from({ length: 10 }, () => ({
    firstName: '',
    lastName: '',
    brideGroomOrMutual: '',
    guestValue: 1,
    plusOneSelected: false,
    plusOneFirstName: '',
    plusOneLastName: '',
    plusOneValue: 1,
    otherGuests: false,
    addOnFirstName: '',
    addOnLastName: '',
    addOnValue: 1,
    moreGuests: false,
    howMany: null,
})));


  const handleFirstNameChange = (value, index, nameType) => {
    setRowsEverybodyElse(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('firstName', value, index, nameType);
  };

  const handleLastNameChange = (value, index, nameType) => {
    setRowsEverybodyElse(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('lastName', value, index, nameType);
  };

  const [selectedCategories, setSelectedCategories] = useState(Array.from({ length: 10 }, () => ''));

  const selectCategory = (value, index, categoryType) => {
    setSelectedCategories(prevCategories => {
      const updatedCategories = [...prevCategories];
      updatedCategories[index] = value;
      return updatedCategories;
    });
    handleAnswer(categoryType, value, index);
  }

  const selectBrideGroomOrMutual = (index, eventKey) => {
    setRowsEverybodyElse(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        brideGroomOrMutual: eventKey
      };
      return updatedRows;
    });
  };

  const handleGuestValueChange = (index, event) => {
    const value = event.target.value;
    setRowsEverybodyElse(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        guestValue: parseFloat(value)
      };
      return updatedRows;
    });
  };

  const handlePlusOneSelectChange = (index, value) => {
    setRowsEverybodyElse(prevRowsEverybodyElse => {
      const updatedRowsEverybodyElse = [...prevRowsEverybodyElse];
      updatedRowsEverybodyElse[index] = { ...updatedRowsEverybodyElse[index], plusOneSelected: value === 'Yes' };
      return updatedRowsEverybodyElse;
    });
    handleAnswer('plusOneSelected', value, index)
  };

  const handlePlusOneFirstNameChange = (value, index, nameType) => {
    setRowsEverybodyElse(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('plusOneFirstName', value, index, nameType);
  };

  const handlePlusOneLastNameChange = (value, index, nameType) => {
    setRowsEverybodyElse(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('plusOneLastName', value, index, nameType);
  };

  const handlePlusOneValueChange = (index, event) => {
    const value = event.target.value;
    setRowsEverybodyElse(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        plusOneValue: parseFloat(value)
      };
      return updatedRows;
    });
  };

  const handleAddOnSelectChange = (index, value) => {
    setRowsEverybodyElse(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], addOnSelected: value === 'Yes' };
      return updatedRows;
    });
  };

  const handleAddOnFirstNameChange = (value, index, nameType) => {
    setRowsEverybodyElse(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('addOnFirstName', value, index, nameType);
  };

  const handleAddOnLastNameChange = (value, index, nameType) => {
    setRowsEverybodyElse(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], [nameType]: value };
      return updatedRows;
    });
    handleAnswer('addOnLastName', value, index, nameType);
  };

  const handleAddOnValueChange = (index, event) => {
    const value = event.target.value;
    setRowsEverybodyElse(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        addOnValue: parseFloat(value)
      };
      return updatedRows;
    });
  };

  const handleExtraAddOnSelectChange = (index, value) => {
    setRowsEverybodyElse(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], extraAddOnSelected: value === 'Yes' };
      return updatedRows;
    });
  };

  const handleSelectedNumber = (index, eventKey) => {
    setRowsEverybodyElse(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index].howMany = eventKey;
      return updatedRows;
    });
  };

  const generateDropdownOptions = () => {
    const options = [];
    for (let i = 0; i <= 10; i++) {
      options.push(<Dropdown.Item key={i} eventKey={i}>{i}</Dropdown.Item>);
    }
    return options;
  };

  const addRowEverybodyElse = () => {
    setRowsEverybodyElse(prevRowsEverybodyElse => {
      const newRow = { plusOneSelected: '' };
      return [...prevRowsEverybodyElse, newRow];
    });
  };

const submitEverybodyElse = async () => {
  
  try {
      for (let i = 0; i < rowsEverybodyElse.length; i++) {
        const row = rowsEverybodyElse[i];
        if (row.firstName || row.lastName) {

          const addOnValue = isNaN(row.addOnValue) ? 0 : parseFloat(row.addOnValue);

          const formData = {
            firstName: row.firstName,
            lastName: row.lastName,
            selectedCategory: selectedCategories[i],
            brideGroomOrMutual: row.brideGroomOrMutual,
            guestValue: row.guestValue,
            plusOneSelected: row.plusOneSelected,
            plusOneFirstName: row.plusOneFirstName,
            plusOneLastName: row.plusOneLastName,
            plusOneValue: row.plusOneValue,
            otherGuests: row.otherGuests,
            addOnFirstName: row.addOnFirstName,
            addOnLastName: row.addOnLastName,
            addOnValue: addOnValue, 
            moreGuests: row.moreGuests,
            howMany: row.howMany,
          };

          const response = await axios.post('http://localhost:3000/api/everybodyelse', formData);
          console.log('Form submitted successfully for row', i+1, ':', response.data);
        }
      }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

  return (
    <div className='wedding-party-form'>
      <Form className="row-fluid">
        <Table responsive="sm">
          <thead className='table-head'>
            <tr>
            <th>#</th>
              <th>Guest First Name</th>
              <th>Guest Last Name</th>
              <th>Category</th>
              <th>Bride / Groom / Mutual?</th>
              <th>How important is it that they come?</th>
              <th>Plus One / Significant Other?</th>
              <th>Plus One First Name</th>
              <th>Plus One Last Name</th>
              <th>How important is it that they come?</th>
              <th>Other guests such as kids?</th>
              <th>Add-On First Name</th>
              <th>Add-On Last Name</th>
              <th>How important is it that they come?</th>
              <th>Any others?</th>
              <th>How many?</th>
            </tr>
          </thead>
          <tbody>
            {rowsEverybodyElse.map((row, index) => (
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
                    title={row.brideGroomOrMutual ? row.brideGroomOrMutual : 'Select One'}
                    onSelect={(eventKey) => selectBrideGroomOrMutual(index, eventKey)}
                  >
                    <Dropdown.Item 
                      eventKey="Bride"
                      >Bride
                    </Dropdown.Item>
                    <Dropdown.Item 
                      eventKey="Groom"
                      >Groom
                    </Dropdown.Item>
                    <Dropdown.Item 
                      eventKey="Mutual"
                      >Mutual
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
                <td>
                  <Form.Range
                    min={1}
                    max={5}
                    step={0.5}
                    value={row.guestValue} 
                    onChange={(e) => handleGuestValueChange(index, e)} 
                  />
                  <p>Selected Value: {row.guestValue}</p> 
                </td>
                <td>
                  <DropdownButton 
                    variant="outline-secondary" 
                    title={row.plusOneSelected ? 'Yes' : (row.plusOneSelected === false ? 'No' : 'Select One')}
                    onSelect={(value) => handlePlusOneSelectChange(index, value)}
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
                    disabled={!row.plusOneSelected || row.plusOneSelected === 'No'}
                    value={row.plusOneFirstName} 
                    onChange={(e) => handlePlusOneFirstNameChange(e.target.value, index, 'plusOneFirstName')}
                  />
                </td>
                <td>
                  <Form.Control 
                    type="text" 
                    disabled={!row.plusOneSelected || row.plusOneSelected === 'No'}
                    value={row.plusOneLastName} 
                    onChange={(e) => handlePlusOneLastNameChange(e.target.value, index, 'plusOneLastName')}
                  />
                </td>
                <td>
                  <Form.Range
                    min={1}
                    max={5}
                    step={0.5}
                    disabled={!row.plusOneSelected || row.plusOneSelected === 'No'}
                    value={row.plusOneValue} 
                    onChange={(e) => handlePlusOneValueChange(index, e)} 
                  />
                  <p>Selected Value: {row.plusOneValue}</p> 
                </td>
                <td>
                  <DropdownButton 
                    variant="outline-secondary" 
                    title={row.addOnSelected ? 'Yes' : (row.addOnSelected === false ? 'No' : 'Select One')} 
                    onSelect={(value) => handleAddOnSelectChange(index, value)}
                  >
                    <Dropdown.Item 
                      eventKey="Yes"
                      >Yes
                    </Dropdown.Item>
                    <Dropdown.Item 
                      eventKey="No"
                      >No
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
                <td>
                  <Form.Control 
                    type="text" 
                    disabled={!row.addOnSelected || row.addOnSelected === 'No'}
                    value={row.addOnFirstName} 
                    onChange={(e) => handleAddOnFirstNameChange(e.target.value, index, 'addOnFirstName')}
                    />
                </td>
                <td>
                  <Form.Control 
                    type="text" 
                    disabled={!row.addOnSelected || row.addOnSelected === 'No'}
                    value={row.addOnlastName} 
                    onChange={(e) => handleAddOnLastNameChange(e.target.value, index, 'addOnLastName')}
                    />
                </td>
                <td>
                  <Form.Range 
                    min={1} 
                    max={5} 
                    step={0.5} 
                    disabled={!row.addOnSelected || row.addOnSelected === 'No'}
                    value={row.addOnValue} 
                    onChange={(e) => handleAddOnValueChange(index, e)} 
                  />
                  <p>Selected Value: {row.addOnValue}</p> 
                </td>
                <td>
                  <DropdownButton 
                    variant="outline-secondary" 
                    disabled={!row.addOnSelected || row.addOnSelected === 'No'} 
                    title={row.extraAddOnSelected ? 'Yes' : (row.extraAddOnSelected === false ? 'No' : 'Select One')} 
                    onSelect={(value) => handleExtraAddOnSelectChange(index, value)}
                  >
                    <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                    <Dropdown.Item eventKey="No">No</Dropdown.Item>
                  </DropdownButton>
                </td>
                <td>
                  <DropdownButton 
                    variant="outline-secondary" 
                    disabled={!row.addOnSelected || row.addOnSelected === 'No'} 
                    onSelect={(eventKey) => handleSelectedNumber(index, eventKey)} 
                    title={row.howMany !== null ? row.howMany : ''}
                  >
                      {generateDropdownOptions()}
                  </DropdownButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <Button className='add-row-button' onClick={addRowEverybodyElse}>Add Row</Button>
          <Button className='add-row-button' onClick={submitEverybodyElse}>Submit Everybody Else</Button>
        </div>
      </Form>
    </div>
  );
}

export default EverybodyElse;