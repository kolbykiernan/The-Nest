import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';



const EverybodyElse = ({ categories, handleAnswer, everybodyElseData, setEverybodyElseData }) => {   


const [selectedCategories, setSelectedCategories] = useState(() => {
  const storedCategories = localStorage.getItem('everybodyElseSelectedCategories');
  return storedCategories ? JSON.parse(storedCategories) : Array.from({ length: 10 }, () => '');
});
const selectCategory = (value, index, categoryType) => {
  setSelectedCategories(prevCategories => {
      const updatedCategories = [...prevCategories];
      updatedCategories[index] = value;
      return updatedCategories;
  });
  handleAnswer(categoryType, value, index);
  setEverybodyElseData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], selectedCategory: value };
      return newData;
  });
}

    useEffect(() => {
      localStorage.setItem('everybodyElseData', JSON.stringify(everybodyElseData));

    }, [everybodyElseData]);

    useEffect(() => {
      localStorage.setItem('everybodyElseSelectedCategories', JSON.stringify(selectedCategories));
    }, [selectedCategories]);
  


    const handleFirstNameChange = (value, id) => {
      const updatedEverybodyElseData = everybodyElseData.map(row =>
        row.id === id ? { ...row, firstName: value } : row
      );
      setEverybodyElseData(updatedEverybodyElseData);
      handleAnswer(id, { firstName: value });
    };
    
    const handleLastNameChange = (value, id) => {
      const updatedEverybodyElseData = everybodyElseData.map(row =>
        row.id === id ? { ...row, lastName: value } : row
      );
      setEverybodyElseData(updatedEverybodyElseData);
      handleAnswer(id, { lastName: value });
    };
    
    const selectBrideGroomOrMutual = (value, id) => {
      const updatedEverybodyElseData = everybodyElseData.map(row =>
        row.id === id ? { ...row, brideGroomOrMutual: value } : row
      );
      setEverybodyElseData(updatedEverybodyElseData);
      handleAnswer(id, { brideGroomOrMutual: value });
    };
    
    const handleGuestValueChange = (value, id) => {
      const updatedEverybodyElseData = everybodyElseData.map(row =>
        row.id === id ? { ...row, guestValue: value } : row
      );
      setEverybodyElseData(updatedEverybodyElseData);
      handleAnswer(id, { guestValue: value });
    };
    
    const handlePlusOneSelectChange = (id, value) => {
      const updatedEverybodyElseData = everybodyElseData.map(row =>
        row.id === id ? { ...row, plusOneSelected: value === 'Yes' } : row
      );
      setEverybodyElseData(updatedEverybodyElseData);
      handleAnswer(id, { plusOneSelected: value === 'Yes' });
    };
    
    const handlePlusOneFirstNameChange = (value, id, firstName) => {
      const updatedEverybodyElseData = everybodyElseData.map(row =>
        row.id === id ? { ...row, plusOneFirstName: value } : row
      );
      setEverybodyElseData(updatedEverybodyElseData);
      handleAnswer(id, { plusOneFirstName: value });
    };
    
    const handlePlusOneLastNameChange = (value, id) => {
      const updatedEverybodyElseData = everybodyElseData.map(row =>
        row.id === id ? { ...row, plusOneLastName: value } : row
      );
      setEverybodyElseData(updatedEverybodyElseData);
      handleAnswer(id, { plusOneLastName: value });
    };
    
    const handlePlusOneValueChange = (value, id) => {
      const updatedEverybodyElseData = everybodyElseData.map(row =>
        row.id === id ? { ...row, plusOneValue: value } : row
      );
      setEverybodyElseData(updatedEverybodyElseData);
      handleAnswer(id, { plusOneValue: value });
    };
    

  const addRowEverybodyElse = () => {
    const newRow = {
      id: everybodyElseData.length + 1,
      firstName: '',
      lastName: '',
      selectedCategory: '',
      brideGroomOrMutual: '',
      guestValue: 1,
      plusOneSelected: '',
      plusOneFirstName: '',
      plusOneLastName: '',
      plusOneValue: 1,
      };

    const updatedEverybodyElseData = [...everybodyElseData, newRow];
    setEverybodyElseData(updatedEverybodyElseData);
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
              <th>Bride / Groom / Mutual?</th>
              <th>How important is it that they come?</th>
              <th>Plus One / Significant Other?</th>
              <th>Plus One First Name</th>
              <th>Plus One Last Name</th>
              <th>How important is it that they come?</th>
            </tr>
          </thead>
          <tbody className="row-fluid">
            {everybodyElseData.map((row, index) => (
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
                    title={row.brideGroomOrMutual || 'Select One'}
                    onSelect={(value) => selectBrideGroomOrMutual(value, row.id)}
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
                    onChange={(e) => handleGuestValueChange(e.target.value, row.id)} 
                  />
                  <p>Selected Value: {row.guestValue}</p> 
                </td>
                <td>
                  <DropdownButton 
                    variant="outline-secondary" 
                    title={row.plusOneSelected ? 'Yes' : (row.plusOneSelected === false ? 'No' : 'Select One')}
                    onSelect={(value) => handlePlusOneSelectChange(row.id, value)}
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
                    onChange={(e) => handlePlusOneFirstNameChange(e.target.value, row.id, row.firstName)}
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
          <Button className='add-row-button' onClick={addRowEverybodyElse}>Add Row</Button>
        </div>
      </div>
    </div>
  );
}

export default EverybodyElse;