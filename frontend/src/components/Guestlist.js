import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from '../default-views/header';
import Footer from '../default-views/Footer';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';



export default function Guestlist({ categories }) {
 
  const [loading, setLoading] = useState(true);
  const [rowIndexOffset, setRowIndexOffset] = useState(0); 
  const [selectedCategory, setSelectedCategory] = useState('Total');
  const [guestlistData, setGuestlistData] = useState(null);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [venueCapacity, setVenueCapacity] = useState('');
  const [desiredAttendance, setDesiredAttendance] = useState('');
  const [costPerPerson, setCostPerPerson] = useState('');
  const [markedList, setMarkedList] = useState(null);
  
  
  const renderCategories = () => {
    if (!categories || categories.length === 0) {
      return (
        <div className="alert alert-danger" role="alert" id="guestlist-categories-error" >
          Please return to the Questionnaire and create categories to fully optimize creating your guestlist.
        </div>
      );
    } else {
    
    return (
      <Nav >
        <Nav.Item>
          <Nav.Link onClick={() => setSelectedCategory('Total')} className={selectedCategory === 'Total' ? 'active' : ''}>Total</Nav.Link>
        </Nav.Item>
          {categories.map((category, index) => (
            <Nav.Item key={index}>
          <Nav.Link onClick={() => setSelectedCategory(category.name)} className={selectedCategory === category.name ? 'active' : ''}>{category.name}</Nav.Link>
        </Nav.Item>
         ))}
      </Nav>
    );
  };
}
  
  
  
useEffect(() => {
  const fetchDataFromServer = async () => {
    try {
      
      const bridesmaidsResponse = await axios.get(`http://localhost:3000/api/bridesmaids`);
      const groomsmenResponse = await axios.get(`http://localhost:3000/api/groomsmen`);
      const everybodyElseResponse = await axios.get(`http://localhost:3000/api/guest`);

      const combinedData = [
        ...bridesmaidsResponse.data,
        ...groomsmenResponse.data,
        ...everybodyElseResponse.data
      ];

      setGuestlistData(combinedData);
      localStorage.setItem('editableData', JSON.stringify(combinedData));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setInitialDataFetched(true);
      setLoading(false);
    }
  };

  const fetchDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('editableData');
    if (storedData) {
      setGuestlistData(JSON.parse(storedData));
    }
    setInitialDataFetched(true);
    setLoading(false);
  };

  if (!initialDataFetched) {
    // Check if data is available in localStorage, if not, fetch from the server
    if (!localStorage.getItem('editableData')) {
      fetchDataFromServer();
    } else {
      fetchDataFromLocalStorage();
    }
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
  

    let conditionalClass = '';
    if (field === 'brideGroomOrMutual') {
      conditionalClass = 'guestlist-bride-groom-or-mutual';
      return (
        <DropdownButton title={value || 'Select One'} onSelect={handleInputChange} variant="outline-secondary" className={conditionalClass}>
          <Dropdown.Item eventKey="Bride">Bride</Dropdown.Item>
          <Dropdown.Item eventKey="Groom">Groom</Dropdown.Item>
          <Dropdown.Item eventKey="Mutual">Mutual</Dropdown.Item>
        </DropdownButton>
      );
    } else if (field === 'selectedCategory') {
      conditionalClass = 'guestlist-categories';
      return (
        <DropdownButton title={value || 'Select One'} onSelect={handleInputChange} variant="outline-secondary" className={conditionalClass}>
          {categories.map(category => (
            <Dropdown.Item key={category.id} eventKey={category.name}>{category.name}</Dropdown.Item>
          ))}
        </DropdownButton>
      );
    } else if (field === 'guestValue' || field === 'plusOneValue' || field === 'addOnValue') {
      conditionalClass = 'guestlist-value';
      return (
        <DropdownButton title={value || 'TBD'} placeholder={value || 'TBD'} onSelect={handleInputChange} variant="outline-secondary" className={conditionalClass}>
          {[...Array(9)].map((_, i) => {
            const optionValue = i / 2 + 1; 
            return <Dropdown.Item key={i} eventKey={optionValue}>{optionValue}</Dropdown.Item>;
          })}
        </DropdownButton>
      );
    } else if (field === 'firstName' || field === 'lastName' || field === 'plusOneFirstName' || field === 'plusOneLastName'){
      conditionalClass = 'guestlist-names';
      return (
        <Form.Control type="text" placeholder={value || 'TBD'} value={value} onChange={(e) => handleInputChange(e.target.value)} className={conditionalClass}/>
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
  setRowIndexOffset(rowIndexOffset); 
};



const handleDeleteRow = (index, dynamicallyAdded) => {
  if (dynamicallyAdded) {
    const updatedData = [...guestlistData];
    updatedData.splice(index, 1); 
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

  const dataToUse = markedList ? markedList : guestlistData;

  if (dataToUse) {
    dataToUse.forEach((item, index) => {
      if (selectedCategory === 'Total' || item.selectedCategory === selectedCategory) {

        rows.push(renderRowItem(item, index, currentRowIndex));
        currentRowIndex += getRowCount(item); 
      }
    });
  }

  return rows;
};

const renderRowItem = (item, index, currentRowIndex) => {
  const rowItems = [];

  rowItems.push(
        <tr key={index} className={item.backgroundClass}>
          <td>{currentRowIndex}</td>
          <td>{renderEditableField(item.firstName, index, 'firstName', item)}</td>
          <td>{renderEditableField(item.lastName, index, 'lastName', item)}</td>
          <td>{renderEditableField(item.brideGroomOrMutual, index, 'brideGroomOrMutual', item)}</td>
          <td>{renderEditableField(item.selectedCategory, index, 'selectedCategory', item)}</td>
          <td>{renderEditableField(item.guestValue , index, 'guestValue', item)}</td>
          <td className="button-container">
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
          <tr key={`${index}-plusOne`} className={item.backgroundClass}>
            <td>{currentRowIndex}</td>
            <td>{renderEditableField(item.plusOneFirstName, index, 'plusOneFirstName')}</td>
            <td>{renderEditableField(item.plusOneLastName, index, 'plusOneLastName')}</td>
            <td>{renderEditableField(item.brideGroomOrMutual || 'Wedding Party +1', index, 'brideGroomOrMutual')}</td>
            <td>{renderEditableField(item.selectedCategory, index, 'selectedCategory')}</td>
            <td>{renderEditableField(item.plusOneValue, index, 'plusOneValue')}</td> 
            <td className="button-container">
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

const [analysisMessage, setAnalysisMessage] = useState('');
const [submittedOnce, setSubmittedOnce] = useState(false);

useEffect(() => {
  const storedSubmittedOnce = localStorage.getItem('submittedOnce');
  if (storedSubmittedOnce) {
    setSubmittedOnce(JSON.parse(storedSubmittedOnce));
  } else {
    // If submittedOnce is not in local storage, initialize it to false
    localStorage.setItem('submittedOnce', JSON.stringify(false));
  }
}, []);

const [emptyRankingErrorMessage, setEmptyRankingErrorMessage] = useState(null)
const [emptyAttendanceErrorMessage, setEmptyAttendanceErrorMessage] = useState(null);
const [venueCapacityMessage, setVenueCapacityMessage] = useState(null)


const runSortedList = async () => {
  try {
    const desiredAttendanceCount = parseInt(desiredAttendance);

    if (!desiredAttendance || isNaN(desiredAttendanceCount)) {
      setEmptyAttendanceErrorMessage("Please enter the desired attendance count before running the list!");
      return;
    } else {
      setEmptyAttendanceErrorMessage(null);
    }

    const hasEmptyValues = guestlistData.some(item => item.guestValue === "");

    if (hasEmptyValues) {
      setEmptyRankingErrorMessage("It looks like there are some guests who don't have a 'Ranking'. Please make sure this is filled out before running the list!");
      return; 
    } else {
      setEmptyRankingErrorMessage(null); 
    }

    const newData = [];
    

    guestlistData.forEach((item, index)  => {
      const adjustedIndex = index + 1;
      const backgroundClass = adjustedIndex <= desiredAttendanceCount ? 'able-to-attend' : 'unable-to-attend';

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

    setGuestlistData(newData);

    if (!submittedOnce) {
      // If not submitted once, send a POST request
      const response = await axios.post(`http://localhost:3000/api/guestlist`, newData);
      console.log('Guestlist data submitted:', response.data);
      
      // Set submittedOnce to true and store it in local storage
      setSubmittedOnce(true);
      localStorage.setItem('submittedOnce', JSON.stringify(true));
    } else {
      // If already submitted once, send a PUT request
      const response = await axios.put(`http://localhost:3000/api/editGuestlist`, guestlistData);
      console.log('Guestlist data updated:', response.data);
    }

    const sortedResponse = await axios.get(`http://localhost:3000/api/guestlist?sortBy=guestValue&order=desc`);
    const sortedGuestlist = sortedResponse.data;
    
    
    const updatedGuestlistData = sortedGuestlist.map((guest, index) => {
      const adjustedIndex = index + 1;
      const backgroundClass = adjustedIndex <= desiredAttendanceCount ? 'able-to-attend' : 'unable-to-attend';
      return { ...guest, backgroundClass };
    });

    setGuestlistData(updatedGuestlistData);
    localStorage.setItem('guestlistData', JSON.stringify(updatedGuestlistData));
    
    if (venueCapacity > desiredAttendanceCount && venueCapacity > sortedGuestlist.length) {
      setVenueCapacityMessage("However, your venue is able to accommodate all the guests in your current guest list in case you're willing to adjust your desired attendance.");
    } else {
      setVenueCapacityMessage(null);
    }
    
    const analysisMessage = desiredAttendanceCount >= sortedGuestlist.length ?
      `Based on the number of guests you'd like to attend, you can invite everybody on your list. ${venueCapacityMessage ? venueCapacityMessage : ''}. You can continue to make adjustments to help manage your guestlist! ` :
      `Based on the number of guests you'd like to attend, ${sortedGuestlist.length - desiredAttendanceCount} guests will not be able to come. ${venueCapacityMessage ? venueCapacityMessage : ''} You can continue to make adjustments to help manage your guestlist! `;

    setAnalysisMessage(analysisMessage);
  } catch (error) {
    console.error('Error updating guestlist data:', error);
  }
};

useEffect(() => {
  const storedGuestlistData = localStorage.getItem('guestlistData');
  if (storedGuestlistData) {
    setGuestlistData(JSON.parse(storedGuestlistData));
  }
}, []);

const handleInputChange = (event, setter, key) => {
  const { value } = event.target;
  setter(value);
  localStorage.setItem(key, value);
};

useEffect(() => {
    const storedCapacity = localStorage.getItem('venueCapacity');
    if (storedCapacity) setVenueCapacity(storedCapacity);

    const storedDesiredAttendance = localStorage.getItem('desiredAttendance');
    if (storedDesiredAttendance) setDesiredAttendance(storedDesiredAttendance);

    const storedCostPerPerson = localStorage.getItem('costPerPerson');
    if (storedCostPerPerson) setCostPerPerson(storedCostPerPerson);
  }, []);

  

  return (
    <div className='guestlist'>
      <Header />
      <div className='guestlist-body'>
          <Sidebar 
            guestlistData={guestlistData} 
            runSortedList={runSortedList}
            handleInputChange={handleInputChange}
            desiredAttendance={desiredAttendance}
            setDesiredAttendance={setDesiredAttendance}
            venueCapacity={venueCapacity}
            setVenueCapacity={setVenueCapacity}
            costPerPerson={costPerPerson}
            setCostPerPerson={setCostPerPerson}
            analysisMessage={analysisMessage} 
            emptyRankingErrorMessage={emptyRankingErrorMessage}
            emptyAttendanceErrorMessage={emptyAttendanceErrorMessage}
          />
        <div className="guestlist-table">
            <Nav fill variant="underline" className='guestlist-navbar-tabs' responsive="sm">
              {renderCategories()}
            </Nav>
              <table responsive="sm" className='guestlist-table-rows'>
                <thead className='scrollable-table-headers'>
                  <tr className='scrollable-table-headers-columns'>
                    <th className='index-number'>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Bride / Groom / Mutual</th>
                    <th>Category</th>
                    <th>Ranking</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="scrollable-table">
                  {renderRowsForCategory()}
                </tbody>
              </table>
            <Button className='add-row-button' onClick={handleAddRowFromTheBottom}>Add Row</Button>
          </div>
      </div>
      <Footer />
    </div>
  );
}