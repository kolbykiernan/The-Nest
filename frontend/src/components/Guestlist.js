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
import axios from 'axios';


export default function Guestlist({ categories, setBridesmaidsData, setGroomsmenData, setEverybodyElseData }) {
 
  const renderCategories = () => {
    if (!categories || categories.length === 0) {
      return <div>No categories available</div>;
    }

    return categories.map((category, index) => (
      <Nav.Item key={index}>
        <Nav.Link>
          <div>{category.name}</div>
        </Nav.Link>
      </Nav.Item>
    ));
  };

  const [guestlistData, setGuestlistData] = useState([]);
  const [rowIndexOffset, setRowIndexOffset] = useState(0); 
  const [additionalRowGuestValue, setAdditionalRowGuestValue] = useState('');
  const [additionalRowFirstName, setAdditionalRowFirstName] = useState('');
  const [additionalRowLastName, setAdditionalRowLastName] = useState('');

const handleAdditionalRowGuestValueChange = (selectedValue) => {
  setAdditionalRowGuestValue(selectedValue);
};

const handleAdditionalRowFirstNameChange = (value) => {
  setAdditionalRowFirstName(value);
};

const handleAdditionalRowLastNameChange = (value) => {
  setAdditionalRowLastName(value);
};


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const bridesmaidsResponse = await axios.get('http://localhost:3000/api/bridesmaids');
        setBridesmaidsData(bridesmaidsResponse.data);

        const groomsmenResponse = await axios.get('http://localhost:3000/api/groomsmen');
        setGroomsmenData(groomsmenResponse.data);

        const everybodyElseResponse = await axios.get('http://localhost:3000/api/everybodyelse');
        setEverybodyElseData(everybodyElseResponse.data);

        // Initialize editable data with fetched data
        const combinedData = [
          ...bridesmaidsResponse.data,
          ...groomsmenResponse.data,
          ...everybodyElseResponse.data
        ];
        setGuestlistData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditField = (index, field, value) => {
    const newData = [...guestlistData];
    newData[index][field] = value;
    setGuestlistData(newData);

    localStorage.setItem('editableData', JSON.stringify(newData));
  };


  const renderEditableField = (value, index, field) => {
    const handleInputChange = (selectedValue) => {
      handleEditField(index, field, selectedValue);
    };

   

  if (field === 'brideGroomOrMutual') {
    return (
      <DropdownButton title={value || 'Select'} onSelect={handleInputChange} variant="outline-secondary" className='guestlist-bride-groom-or-mutual'>
        <Dropdown.Item eventKey="bride">Bride</Dropdown.Item>
        <Dropdown.Item eventKey="groom">Groom</Dropdown.Item>
        <Dropdown.Item eventKey="mutual">Mutual</Dropdown.Item>
      </DropdownButton>
    );
  } else if (field === 'selectedCategory') {
    return (
      <DropdownButton title={value || 'Select'} onSelect={handleInputChange} variant="outline-secondary" className='guestlist-categories'>
        {categories.map(category => (
          <Dropdown.Item key={category.id} eventKey={category.name}>{category.name}</Dropdown.Item>
        ))}
      </DropdownButton>
    );
  } else if (field === 'guestValue' || field === 'plusOneValueBridesmaids' || field === 'plusOneValueGroomsmen' || field === 'addOnValue') {
    return (
      <DropdownButton title={value || 'TBD'} onSelect={handleInputChange} variant="outline-secondary" className='guestlist-value'>
        {[...Array(9)].map((_, i) => {
          const optionValue = i / 2 + 1; 
          return <Dropdown.Item key={i} eventKey={optionValue}>{optionValue}</Dropdown.Item>;
        })}
      </DropdownButton>      
    );
  } else if (field === 'additionalRowGuestValue') {
  
    return (
            <DropdownButton title={value || 'TBD'} onSelect={handleAdditionalRowGuestValueChange} variant="outline-secondary" className='guestlist-value'>
                {[...Array(9)].map((_, i) => {
                    const optionValue = i / 2 + 1; 
                    return <Dropdown.Item key={i} eventKey={optionValue}>{optionValue}</Dropdown.Item>;
                })}
            </DropdownButton>
    );
  } else if (field === 'additionalRowFirstName') {
    return (
      <Form.Control type="text" placeholder={value || 'TBD'} value={additionalRowFirstName} onChange={(e) => handleAdditionalRowFirstNameChange(e.target.value)} className='guestlist-names'/>
    );
  } else if (field === 'additionalRowLastName') {
    return (
      <Form.Control type="text" placeholder={value || 'TBD'} value={additionalRowLastName} onChange={(e) => handleAdditionalRowLastNameChange(e.target.value)} className='guestlist-names'/>
    );
  }
else {
    return (
      <Form.Control type="text" placeholder={value || 'TBD'} value={value} onChange={(e) => handleInputChange(e.target.value)} className='guestlist-names'/>
    );
  }
};


  const renderRow = () => {
    let currentRowIndex = rowIndexOffset + 1;
    const rows = [];
  
    guestlistData.forEach((item, index) => {
      // Render the main row
      rows.push(
        <tr key={index}>
          <td>{currentRowIndex}</td>
          <td>{renderEditableField(item.firstName, index, 'firstName')}</td>
          <td>{renderEditableField(item.lastName, index, 'lastName')}</td>
          <td>{renderEditableField(item.brideGroomOrMutual || 'Wedding Party', index, 'brideGroomOrMutual')}</td>
          <td>{renderEditableField(item.selectedCategory, index, 'selectedCategory')}</td>
          <td>{renderEditableField(item.guestValue || 5 , index, 'guestValue')}</td>
        </tr>
      );

      currentRowIndex++;
  
      // Check conditions for additional rows
      if (item.plusOneSelectedBridesmaids === 'true' || item.plusOneSelectedGroomsmen === 'true' || item.plusOneSelected === 'true') {
        // Render additional row
        rows.push(
          <tr key={`${index}-plusOne`}>
            <td>{currentRowIndex}</td>
            <td>{renderEditableField(item.plusOneFirstName, index, 'plusOneFirstName')}</td>
            <td>{renderEditableField(item.plusOneLastName, index, 'plusOneLastName')}</td>
            <td>{renderEditableField(item.brideGroomOrMutual || 'Wedding Party +1', index, 'brideGroomOrMutual')}</td>
            <td>{renderEditableField(item.selectedCategory, index, 'selectedCategory')}</td>
            <td>{renderEditableField(
                item.plusOneValueBridesmaids || item.plusOneValueGroomsmen || item.guestValue, 
                index, 
                item.plusOneSelectedBridesmaids ? 'plusOneValueBridesmaids' :
                  item.plusOneSelectedGroomsmen ? 'plusOneValueGroomsmen' :
                  'plusOneValue'
              )}
            </td>          
          </tr>
        );
        currentRowIndex++;
      }
  
      if (item.otherGuests === true) {
        // Render additional row
        rows.push(
          <tr key={`${index}-otherGuest`}>
            <td>{currentRowIndex}</td>
            <td>{renderEditableField(item.addOnFirstName, index, 'addOnFirstName')}</td>
            <td>{renderEditableField(item.addOnLastName, index, 'addOnLastName')}</td>
            <td>{renderEditableField(item.brideGroomOrMutual || '+1', index, 'brideGroomOrMutual')}</td>
            <td>{renderEditableField(item.selectedCategory, index, 'selectedCategory')}</td>
            <td>{renderEditableField(item.addOnValue, index, 'addOnValue')}</td>
          </tr>
        );
        currentRowIndex++;
      }
  
      if (item.howMany) {
        // Render additional rows
        for (let i = 0; i < item.howMany; i++) {
          rows.push(
            <tr key={`${index}-extra-${i}`}>
              <td>{currentRowIndex}</td>
              <td>{renderEditableField(additionalRowFirstName, index, 'additionalRowFirstName')}</td>
              <td>{renderEditableField(additionalRowLastName, index, 'additionalRowLastName')}</td>
              <td>{renderEditableField(item.brideGroomOrMutual, index, 'brideGroomOrMutual')}</td>
              <td>{renderEditableField(item.selectedCategory, index, 'selectedCategory')}</td>
              <td>{renderEditableField(additionalRowGuestValue, index, 'additionalRowGuestValue')}</td>
            </tr>
          );
          
        currentRowIndex++;
        }
      }
    });
  
    return rows; 
  };
  

  return (
    <div className='guestlist'>
      <Header />
      <div className='guestlist-body'>
        <div className="guestlist-sidebar">
          <Sidebar />
        </div>
        <div className="guestlist-table">

            <Container fluid>
              <Nav className='navbar-tabs' fill variant="underline">
                <Nav.Item>
                  <Nav.Link>
                    <div>Total</div>
                  </Nav.Link>
                </Nav.Item>
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
                  </tr>
                </thead>
                <tbody>
                  {renderRow()}
                </tbody>
              </Table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}