import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from '../default-views/header';
import Footer from '../default-views/Footer';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';



export default function Guestlist({ categories, setBridesmaidsData, setGroomsmenData, setEverybodyElseData, answers }) {
 
  const [loading, setLoading] = useState(true);
  const [rowIndexOffset, setRowIndexOffset] = useState(0); 
  const [howManyGuestValue, setHowManyGuestValue] = useState('');
  const [howManyFirstName, setHowManyFirstName] = useState('');
  const [howManyLastName, setHowManyLastName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Total');
 
  
  
  const renderCategories = () => {
    if (!categories || categories.length === 0) {
      return <div>Please fill out and submit the Questionnaire first.</div>;
    }
    
    return (
      <>
        <Nav.Item>
          <Nav.Link onClick={() => setSelectedCategory('Total')} className={selectedCategory === 'Total' ? 'active' : ''}>Total</Nav.Link>
        </Nav.Item>
          {categories.map((category, index) => (
            <Nav.Item key={index}>
          <Nav.Link onClick={() => setSelectedCategory(category.name)} className={selectedCategory === category.name ? 'active' : ''}>{category.name}</Nav.Link>
        </Nav.Item>
         ))}
      </>
    );
  };
  
  const [guestlistData, setGuestlistData] = useState(null);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem('editableData');
        if (storedData) {
          setGuestlistData(JSON.parse(storedData));
        } else {
          const bridesmaidsResponse = await axios.get('http://localhost:3000/api/bridesmaids');
          const groomsmenResponse = await axios.get('http://localhost:3000/api/groomsmen');
          const everybodyElseResponse = await axios.get('http://localhost:3000/api/everybodyelse');
    
          const combinedData = [
            ...bridesmaidsResponse.data,
            ...groomsmenResponse.data,
            ...everybodyElseResponse.data
          ];
    
          localStorage.setItem('editableData', JSON.stringify(combinedData));
          setGuestlistData(combinedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setInitialDataFetched(true);
        setLoading(false);
      }
    };
  
    if (!initialDataFetched) {
      fetchData();
    }
  }, [initialDataFetched]);
  
  const handleEditField = (index, field, value) => {
    if (!guestlistData) return;
  
    const newData = [...guestlistData];
    newData[index][field] = value;
    setGuestlistData(newData);
    localStorage.setItem('editableData', JSON.stringify(newData));
  };


const renderEditableField = (value, index, field, item) => { 
   
    const handleInputChange = (selectedValue) => {
      handleEditField(index, field, selectedValue);
    };

    if (!value && (field === 'brideGroomOrMutual') && (!item || !item.dynamicallyAdded) && (value !== 'Bride' && value !== 'Groom' && value !== 'Mutual')) {
      value = 'Wedding Party';
    } else if (!value && item && item.dynamicallyAdded && (field === 'guestValue' || field === 'plusOneValue')) {
      value = 'TBD';
    } else if (!value && (field === 'guestValue' || field === 'plusOneValue') && isNaN(parseFloat(value))) {
      value = 5;
    }
  

  if (field === 'brideGroomOrMutual') {
    return (
      <DropdownButton title={value || 'Select One'} onSelect={handleInputChange} variant="outline-secondary" className='guestlist-bride-groom-or-mutual'>
        <Dropdown.Item eventKey="Bride">Bride</Dropdown.Item>
        <Dropdown.Item eventKey="Groom">Groom</Dropdown.Item>
        <Dropdown.Item eventKey="Mutual">Mutual</Dropdown.Item>
      </DropdownButton>
    );
  } else if (field === 'selectedCategory') {
    return (
      <DropdownButton title={value || 'Select One'} onSelect={handleInputChange} variant="outline-secondary" className='guestlist-categories'>
        {categories.map(category => (
          <Dropdown.Item key={category.id} eventKey={category.name}>{category.name}</Dropdown.Item>
        ))}
      </DropdownButton>
    );
  } else if (field === 'guestValue' || field === 'plusOneValue' || field === 'addOnValue') {
    return (
      <DropdownButton title={value || 'TBD'} placeholder={value || 'TBD'} onSelect={handleInputChange} variant="outline-secondary" className='guestlist-value'>
        {[...Array(9)].map((_, i) => {
          const optionValue = i / 2 + 1; 
          return <Dropdown.Item key={i} eventKey={optionValue}>{optionValue}</Dropdown.Item>;
        })}
      </DropdownButton>      
    );
  } 
  else if (field === 'firstName' || field === 'lastName' || field === 'plusOneFirstName' || field === 'plusOneLastName'){
    return (
      <Form.Control type="text" placeholder={value || 'TBD'} value={value} onChange={(e) => handleInputChange(e.target.value)} className='guestlist-names'/>
    );
  } 
};


const handleAddRow = (index) => {
  const newRow = {
    firstName: '',
    lastName: '',
    brideGroomOrMutual: '',
    selectedCategory: selectedCategory === 'Total' ? '' : selectedCategory,
    guestValue: '',
    dynamicallyAdded: true,
  };
  const updatedData = [
    ...guestlistData.slice(0, index + 1),
    newRow,
    ...guestlistData.slice(index + 1)
  ];
  setGuestlistData(updatedData);
  setRowIndexOffset(rowIndexOffset); // Increment row index offset
};



const handleDeleteRow = (index, dynamicallyAdded) => {
  if (dynamicallyAdded) {
    const updatedData = [...guestlistData];
    updatedData.splice(index, 1); // Remove the row at the given index
    setGuestlistData(updatedData);

    localStorage.setItem('editableData', JSON.stringify(updatedData));
  }
}

const handleAddRowFromTheBottom = () => {
  const newRow = {
    firstName: '',
    lastName: '',
    brideGroomOrMutual: '',
    selectedCategory: selectedCategory === 'Total' ? '' : selectedCategory,
    guestValue: '',
    dynamicallyAdded: true,
  };
  const updatedData = [
    ...guestlistData,
    newRow,
  ];
  setGuestlistData(updatedData);
  setRowIndexOffset(rowIndexOffset); 

};


const renderRowsForCategory = () => {
  let currentRowIndex = rowIndexOffset + 1;
  const rows = [];

  if (guestlistData) {
    guestlistData.forEach((item, index) => {
      if (selectedCategory === 'Total' || item.selectedCategory === selectedCategory) {
        // Render rows only for the selected category
        rows.push(renderRowItem(item, index, currentRowIndex));
        currentRowIndex += getRowCount(item); // Increment currentRowIndex by the number of rows rendered for the current item
      }
    });
  }

  return rows;
};


const renderRowItem = (item, index, currentRowIndex) => {
  const rowItems = [];

  rowItems.push(
        <tr key={index}>
          <td>{currentRowIndex}</td>
          <td>{renderEditableField(item.firstName, index, 'firstName', item)}</td>
          <td>{renderEditableField(item.lastName, index, 'lastName', item)}</td>
          <td>{renderEditableField(item.brideGroomOrMutual, index, 'brideGroomOrMutual', item)}</td>
          <td>{renderEditableField(item.selectedCategory, index, 'selectedCategory', item)}</td>
          <td>{renderEditableField(item.guestValue , index, 'guestValue', item)}</td>
          <td>
              <Button className='add-subtract-row-buttons' onClick={() => handleAddRow(index)}>+</Button>
              {item.dynamicallyAdded && (
              <Button className='add-subtract-row-buttons' onClick={() => handleDeleteRow(index, true)}>-</Button>
              )}
          </td>
        </tr>
      );

      currentRowIndex++;
  

      if (item.plusOneSelected === 'true') {

        rowItems.push(
          <tr key={`${index}-plusOne`}>
            <td>{currentRowIndex}</td>
            <td>{renderEditableField(item.plusOneFirstName, index, 'plusOneFirstName')}</td>
            <td>{renderEditableField(item.plusOneLastName, index, 'plusOneLastName')}</td>
            <td>{renderEditableField(item.brideGroomOrMutual || 'Wedding Party +1', index, 'brideGroomOrMutual')}</td>
            <td>{renderEditableField(item.selectedCategory, index, 'selectedCategory')}</td>
            <td>{renderEditableField(item.plusOneValue, index, 'plusOneValue')}</td> 
            <td>
              <Button className='add-subtract-row-buttons' onClick={() => handleAddRow(index)}>+</Button>
              {item.dynamicallyAdded && (
              <Button className='add-subtract-row-buttons' onClick={() => handleDeleteRow(index, true)}>-</Button>
              )}
           </td>         
          </tr>
        );
        currentRowIndex++;
      }
  
    return rowItems; 
  };

  const getRowCount = (item) => {
    let rowCount = 1; 

    if (item.plusOneSelected === 'true') {
      rowCount++;
    }
    return rowCount;
  };

const [submittedOnce, setSubmittedOnce] = useState(false);
// Function to send the editableData to the server and submit it to the guestlist table
const submitGuestlistData = async () => {

  if (!guestlistData) return;

  const newData = [];

  guestlistData.forEach(item => {
    if (!item.dynamicallyAdded && item.plusOneSelected === 'true') {
      const plusOneData = {
        firstName: item.plusOneFirstName,
        lastName: item.plusOneLastName,
        selectedCategory: item.selectedCategory,
        brideGroomOrMutual: item.brideGroomOrMutual || 'Wedding Party +1',
        guestValue: item.plusOneValue
      };
      const guestData = {
        firstName: item.firstName,
        lastName: item.lastName,
        selectedCategory: item.selectedCategory,
        brideGroomOrMutual: item.brideGroomOrMutual || 'Wedding Party',
        guestValue: item.guestValue || 5
      };
      newData.push(plusOneData);
      newData.push(guestData);
    } else {
      newData.push({
        firstName: item.firstName,
        lastName: item.lastName,
        selectedCategory: item.selectedCategory,
        brideGroomOrMutual: item.brideGroomOrMutual || 'Wedding Party',
        guestValue: item.guestValue || 5
      });
    }
  });

  console.log(newData);
  
  try {
    if (!submittedOnce) {
      // If not submitted once, make a POST request
      const response = await axios.post('http://localhost:3000/api/guestlist', newData);
      console.log('Guestlist data submitted:', response.data);
      setSubmittedOnce(true);
      setGuestlistData(response.data); // Update the state to indicate submission
    } else {
      // If submitted once, make a PUT request
      const response = await axios.put('http://localhost:3000/api/guestlist', guestlistData);
      console.log('Guestlist data updated:', response.data);
      setGuestlistData(response.data);
    }
  
    // Fetch the updated guestlist data after submitting or updating
    const updatedResponse = await axios.get('http://localhost:3000/api/guestlist');
    setGuestlistData(updatedResponse.data); // Update the state with the latest data
  } catch (error) {
    console.error('Error submitting or updating guestlist data:', error);
  }
};
  

  return (
    <div className='guestlist'>
      <Header />
      <div className='guestlist-body'>
        <div className="guestlist-sidebar">
          <Sidebar submitGuestlistData={submitGuestlistData} answers={answers} />
        </div>
        <div className="guestlist-table">

            <Container fluid>
              <Nav className='navbar-tabs' fill variant="underline">
                {renderCategories()}
              </Nav>
            </Container> 
   
          <div className="scrollable-table">
              <Table responsive="sm">
                <thead className='scrollable-table-headers'>
                  <tr className='scrollable-table-headers-columns'>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Bride / Groom / Mutual</th>
                    <th>Category</th>
                    <th>Ranking</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {renderRowsForCategory()}
                </tbody>
              </Table>
              <Button className='add-row-button' onClick={handleAddRowFromTheBottom}>Add Row</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}