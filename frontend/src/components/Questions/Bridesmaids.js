import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CategoryDropdown from './CategoryDropdown';



const Bridesmaids = ({ categories, handleAnswer, onBridesmaidsDataUpdate }) => {
  const [bridesmaidsData, setBridesmaidsData] = useState(() => {
    // Initialize bridesmaidsData from localStorage or with default values
    const storedData = localStorage.getItem('bridesmaidsData');
    return storedData ? JSON.parse(storedData) : Array.from({ length: 10 }, (_, index) => ({
        id: index, // Unique identifier for each row
        firstName: '',
        lastName: '',
        selectedCategory: '',
        plusOneSelectedBridesmaids: '',
        plusOneFirstName: '',
        plusOneLastName: '',
        selectedRole: '',
        plusOneValueBridesmaids: 1,
    }));
});

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
}

useEffect(() => {
  localStorage.setItem('bridesmaidsData', JSON.stringify(bridesmaidsData));
  
  onBridesmaidsDataUpdate(bridesmaidsData);
}, [bridesmaidsData, onBridesmaidsDataUpdate]);

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
    row.id === id ? { ...row, plusOneSelectedBridesmaids: value === 'Yes' } : row
  );
  setBridesmaidsData(updatedBridesmaidsData);
  handleAnswer(id, { plusOneSelectedBridesmaids: value === 'Yes' });
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
  const updatedBridesmaidsData = bridesmaidsData.map(row =>
    row.id === id ? { ...row, selectedRole: value } : row
  );
  setBridesmaidsData(updatedBridesmaidsData);
  handleAnswer(id, { selectedRole: value });
};

const handlePlusOneValueChange = (value, id) => {
  const updatedBridesmaidsData = bridesmaidsData.map(row =>
    row.id === id ? { ...row, plusOneValueBridesmaids: value } : row
  );
  setBridesmaidsData(updatedBridesmaidsData);
  handleAnswer(id, { plusOneValueBridesmaids: value });
};


  const addRowBridesmaids = () => {
    const newRow = {
      id: bridesmaidsData.length + 1, // Generate a unique ID for the new row
      firstName: '',
      lastName: '',
      selectedCategory: '',
      plusOneSelectedBridesmaids: '',
      plusOneFirstName: '',
      plusOneLastName: '',
      selectedRole: '',
      plusOneValueBridesmaids: 1,
    };
  
    const updatedBridesmaidsData = [...bridesmaidsData, newRow];
    setBridesmaidsData(updatedBridesmaidsData);
  };

  return (
    <div className='wedding-party-form'>
      <div>
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
                  <Dropdown>
                    <CategoryDropdown 
                      index={index}
                      categories={categories} 
                      selectedCategories={selectedCategories} 
                      onChange={(value) => selectCategory(value, row.id)}
                      isDropdown={false} 
                      className="category-select" 
                    />
                  </Dropdown>
                </td>
                <td>
                  <DropdownButton 
                    variant="outline-secondary" 
                    title={row.plusOneSelectedBridesmaids ? 'Yes' : (row.plusOneSelectedBridesmaids === false ? 'No' : 'Select One')}
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
                    disabled={!row.plusOneSelectedBridesmaids || row.plusOneSelectedBridesmaids === 'No'}
                    value={row.plusOneFirstName} 
                    onChange={(e) => handlePlusOneFirstNameChange(e.target.value, row.id)}
                  />
                </td>
                <td>
                  <Form.Control 
                    type="text" 
                    disabled={!row.plusOneSelectedBridesmaids || row.plusOneSelectedBridesmaids === 'No'}
                    value={row.plusOneLastName} 
                    onChange={(e) => handlePlusOneLastNameChange(e.target.value, row.id)}
                  />
                </td>
                <td>
                <Form.Check
                    type="checkbox"
                    label="bridesmaid"
                    className="form-margins"
                    disabled={!row.plusOneSelectedBridesmaids || row.plusOneSelectedBridesmaids === 'No'}
                    value="bridesmaid"
                    onChange={() => isAlsoInWeddingParty('bridesmaid', 'bridesmaid', row.id)}
                />
                <Form.Check
                    type="checkbox"
                    label="groomsmen"
                    disabled={!row.plusOneSelectedBridesmaids || row.plusOneSelectedBridesmaids === 'No'}
                    value="groomsmen"
                    onChange={() => isAlsoInWeddingParty('groomsmen', 'groomsmen', row.id)}
                />
                </td>
                <td>
                  <Form.Range 
                    min={1} 
                    max={5} 
                    step={0.5} 
                    disabled={!row.plusOneSelectedBridesmaids || row.plusOneSelectedBridesmaids === 'No'}
                    value={row.plusOneValueBridesmaids} 
                    onChange={(e) => handlePlusOneValueChange(e.target.value, row.id)}
                  />
                  <p>Selected Value: {row.plusOneValueBridesmaids}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <Button className='add-row-button' onClick={addRowBridesmaids}>Add Row</Button>
          {/* <Button className='add-row-button' onClick={submitBridesmaids}>Submit Bridesmaids</Button> */}
        </div>
      </div>
    </div>
  );
}

export default Bridesmaids;