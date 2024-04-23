import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';



const Bridesmaids = ({ categories, handleAnswer, bridesmaidsData, setBridesmaidsData }) => {
  

  const [selectedCategories, setSelectedCategories] = useState(() => {
    const storedCategories = localStorage.getItem('bridesmaidsSelectedCategories');
    return storedCategories ? JSON.parse(storedCategories) : Array.from({ length: 10 }, () => '');
  });

  const selectCategory = (value, index, categoryType) => {
    setSelectedCategories(prevCategories => {
      const updatedCategories = [...prevCategories];
      updatedCategories[index] = value;
      return updatedCategories;
    });
    handleAnswer(categoryType, value, index);
    setBridesmaidsData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], selectedCategory: value };
      return newData;
    });
  };

  useEffect(() => {
    localStorage.setItem('bridesmaidsData', JSON.stringify(bridesmaidsData));
 
  }, [bridesmaidsData]);

  useEffect(() => {
    localStorage.setItem('bridesmaidsSelectedCategories', JSON.stringify(selectedCategories));
  }, [selectedCategories]);

  const handleFirstNameChange = (value, id) => {
    const updatedBridesmaidsData = bridesmaidsData.map(row =>
      row.id === id ? { ...row, firstName: value } : row
    );
    setBridesmaidsData(updatedBridesmaidsData);
    handleAnswer(id, { firstName: value });
  };

const handleLastNameChange = (value, id) => {
  const updatedBridesmaidsData = bridesmaidsData.map(row =>
    row.id === id ? { ...row, lastName: value } : row
  );
  setBridesmaidsData(updatedBridesmaidsData);
  handleAnswer(id, { lastName: value });
};

const handlePlusOneSelectChangeBridesmaids = (id, value) => {
  const updatedBridesmaidsData = bridesmaidsData.map(row =>
    row.id === id ? { ...row, plusOneSelected: value === 'Yes' } : row
  );
  setBridesmaidsData(updatedBridesmaidsData);
  handleAnswer(id, { plusOneSelected: value === 'Yes' });
};

const handlePlusOneFirstNameChange = (value, id) => {
  const updatedBridesmaidsData = bridesmaidsData.map(row =>
    row.id === id ? { ...row, plusOneFirstName: value } : row
  );
  setBridesmaidsData(updatedBridesmaidsData);
  handleAnswer(id, { plusOneFirstName: value });
};

const handlePlusOneLastNameChange = (value, id) => {
  const updatedBridesmaidsData = bridesmaidsData.map(row =>
    row.id === id ? { ...row, plusOneLastName: value } : row
  );
  setBridesmaidsData(updatedBridesmaidsData);
  handleAnswer(id, { plusOneLastName: value });
};

const isAlsoInWeddingParty = (value, id) => {
  const updatedBridesmaidsData = bridesmaidsData.map(row => {
    if (row.id === id) {
     
      const updatedRole = row.selectedRole === value ? null : value;
      return { ...row, selectedRole: updatedRole };
    } else {
      return row;
    }
  });
  setBridesmaidsData(updatedBridesmaidsData);
  handleAnswer(id, { selectedRole: value });
};

const handlePlusOneValueChange = (value, id) => {
  const updatedBridesmaidsData = bridesmaidsData.map(row =>
    row.id === id ? { ...row, plusOneValue: value } : row
  );
  setBridesmaidsData(updatedBridesmaidsData);
  handleAnswer(id, { plusOneValue: value });
};


  const addRowBridesmaids = () => {
    const newRow = {
      id: bridesmaidsData.length + 1,
      firstName: '',
      lastName: '',
      selectedCategory: '',
      plusOneSelected: '',
      plusOneFirstName: '',
      plusOneLastName: '',
      selectedRole: '',
      plusOneValue: 1,
    };
  
    const updatedBridesmaidsData = [...bridesmaidsData, newRow];
    setBridesmaidsData(updatedBridesmaidsData);
  };

  return (
    <div className='wedding-party-form'>
      <div className="wedding-party-columns">
        <Table responsive="sm">
          <thead className='table-head'>
            <tr>
              <th>#</th>
              <th>Guest First Name</th>
              <th>Guest Last Name</th>
              <th>Category</th>
              <th>Plus One / Significant Other?</th>
              <th>Plus One First Name</th>
              <th>Plus One Last Name</th>
              <th>Check if plus one is also in a wedding party</th>
              <th>How important is it that the plus-one comes?</th>
            </tr>
          </thead>
          <tbody className="row-fluid">
            {bridesmaidsData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <Form.Control 
                      type="text" 
                      value={row.firstName} 
                      onChange={(e) => handleFirstNameChange(e.target.value, row.id)}
                    />
                </td>
                <td>
                    <Form.Control 
                      type="text" 
                      value={row.lastName} 
                      onChange={(e) => handleLastNameChange(e.target.value, row.id)}
                    />
                </td>
                <td>
                <DropdownButton
                  title={selectedCategories[index] || 'Select One'}
                  variant="outline-secondary"
                  id={`category-dropdown-${index}`}
                  align="end"
                  className="category-select"
                >
                  {categories.map((category, idx) => (
                    <Dropdown.Item key={idx} onClick={() => selectCategory(category.name, index, 'selectedCategory')}>
                      {category.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                </td>
                <td>
                  <DropdownButton 
                    variant="outline-secondary" 
                    title={row.plusOneSelected ? 'Yes' : (row.plusOneSelected === false ? 'No' : 'Select One')}
                    onSelect={(value) => handlePlusOneSelectChangeBridesmaids(row.id, value)}
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
                    onChange={(e) => handlePlusOneFirstNameChange(e.target.value, row.id)}
                  />
                </td>
                <td>
                  <Form.Control 
                    type="text" 
                    disabled={!row.plusOneSelected || row.plusOneSelected === 'No'}
                    value={row.plusOneLastName} 
                    onChange={(e) => handlePlusOneLastNameChange(e.target.value, row.id)}
                  />
                </td>
                <td>
                <Form.Check
                  type="checkbox"
                  label="bridesmaid"
                  className="form-margins"
                  disabled={!row.plusOneSelected || row.plusOneSelected === 'No'}
                  checked={row.selectedRole === 'bridesmaid'} 
                  onChange={() => isAlsoInWeddingParty('bridesmaid', row.id)} 
                />
                <Form.Check
                  type="checkbox"
                  label="groomsmen"
                  disabled={!row.plusOneSelected || row.plusOneSelected === 'No'}
                  checked={row.selectedRole === 'groomsmen'} 
                  onChange={() => isAlsoInWeddingParty('groomsmen', row.id)} 
                />
                </td>
                <td>
                  <Form.Range 
                    min={1} 
                    max={5} 
                    step={0.5} 
                    disabled={!row.plusOneSelected || row.plusOneSelected === 'No'}
                    value={row.plusOneValue} 
                    onChange={(e) => handlePlusOneValueChange(e.target.value, row.id)}
                  />
                  <p>Selected Value: {row.plusOneValue}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <Button className='add-row-button' onClick={addRowBridesmaids}>Add Row</Button>
        </div>
      </div>
    </div>
  );
}

export default Bridesmaids;