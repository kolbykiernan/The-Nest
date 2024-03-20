import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CategoryDropdown from './CategoryDropdown';

const EverybodyElse = ({ categories, selectedCategory, handleSelectChange }) => {

  const [rows, setRows] = useState(Array.from({ length: 10 }, () => ({ plusOneSelected: '', addOnSelected: '', selectedAddOns: 0  })));
  const [selectedOption, setSelectedOption] = useState(Array.from({ length: rows.length }, () => null));
  const [guestValue, setGuestValue] = useState(Array.from({ length: 10 }, () => 1));
  const [plusOneValue, setPlusOneValue] = useState(Array.from({ length: 10 }, () => 1));
  const [addOnValue, setAddOnValue] = useState(Array.from({ length: 10 }, () => 1));
  const [extraAddOnValue, setExtraAddOnValue] = useState(Array.from({ length: 10 }, () => 1));
  const [plusOneSelected, setPlusOneSelected] = useState('');
  const [addOnSelected, setAddOnSelected] = useState('');
  const [extraAddOnSelected, setExtraAddOnSelected] = useState('');

    const [selectedAddOns, setSelectedAddOns] = useState(1);
  
    const handleSelectedNumber = (index, eventKey) => {
      setRows(prevRows => {
        const updatedRows = [...prevRows];
        updatedRows[index].selectedAddOns = eventKey;
        return updatedRows;
      });
    };
  
    const generateDropdownOptions = () => {
      const options = [];
      for (let i = 0; i <= 10; i++) {
        if (i === 10) {
          options.push(<Dropdown.Item key="10+" eventKey="10+">10+</Dropdown.Item>);
        } else {
          options.push(<Dropdown.Item key={i} eventKey={i}>{i}</Dropdown.Item>);
        }
      }
      return options;
    };

  const handleRangeChangeGuest = (index, e) => {
    const newValuesGuest = [...guestValue];
    newValuesGuest[index] = parseFloat(e.target.value);
    setGuestValue(newValuesGuest);
  };

  const handleRangeChangePlusOne = (index, e) => {
    const newValuesPlusOne = [...plusOneValue];
    newValuesPlusOne[index] = parseFloat(e.target.value);
    setPlusOneValue(newValuesPlusOne);
  };

  const handleRangeChangeAddOn = (index, e) => {
    const newValuesAddOn = [...addOnValue];
    newValuesAddOn[index] = parseFloat(e.target.value);
    setAddOnValue(newValuesAddOn);
  };

  const handleRangeChangeExtraAddOn = (index, e) => {
    const newValuesExtraAddOn = [...extraAddOnValue];
    newValuesExtraAddOn[index] = parseFloat(e.target.value);
    setExtraAddOnValue(newValuesExtraAddOn);
  };

  const handlePlusOneSelectChange = (index, value) => {
    setRows(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], plusOneSelected: value === 'Yes' };
      return updatedRows;
    });
  };

  const handleAddOnSelectChange = (index, value) => {
    setRows(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], addOnSelected: value === 'Yes' };
      return updatedRows;
    });
  };

  const handleExtraAddOnSelectChange = (index, value) => {
    setRows(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], extraAddOnSelected: value === 'Yes' };
      return updatedRows;
    });
  };

  const addRow = () => {
    setRows(prevRows => [...prevRows, { plusOneSelected: '', addOnSelected: '', selectedAddOns: 0 }]);
    setPlusOneValue(prevValues => [...prevValues, 1]);
  };

  const selectBrideGroomMutual = (index, eventKey) => {
    const newSelectedOption = [...selectedOption];
    newSelectedOption[index] = eventKey;
    setSelectedOption(newSelectedOption);
  }

  return (
    <div className='wedding-party-form'  >
      <Form className="row-fluid" >
        <Table  className='table'>
          <thead >
            <tr >
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
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
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><Form.Control type="text" className='first-name' /></td>
                <td><Form.Control type="text" className='last-name'/></td>
                <td>
                  <Dropdown className='dropdown'>
                    <CategoryDropdown categories={categories} value={selectedCategory} onChange={handleSelectChange} isDropdown={false} className="category-select" />
                  </Dropdown>
                </td>
                <td>
                  <DropdownButton
                    variant="outline-secondary"
                    title={selectedOption[index] ? selectedOption[index] : 'Select One'}
                    onSelect={(eventKey) => selectBrideGroomMutual(index, eventKey)}
                  >
                    <Dropdown.Item eventKey="Bride">Bride</Dropdown.Item>
                    <Dropdown.Item eventKey="Groom">Groom</Dropdown.Item>
                    <Dropdown.Item eventKey="Mutual">Mutual</Dropdown.Item>
                  </DropdownButton>
                </td>
                <td>
                  <Form.Range
                    min={1}
                    max={5}
                    step={0.5}
                    value={guestValue[index]} 
                    onChange={(e) => handleRangeChangeGuest(index, e)} 
                  />
                  <p>Selected Value: {guestValue[index]}</p> 
                </td>
                <td>
                  <DropdownButton variant="outline-secondary" title={row.plusOneSelected ? 'Yes' : (row.plusOneSelected === false ? 'No' : 'Select One')} onSelect={(value) => handlePlusOneSelectChange(index, value)}>
                    <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                    <Dropdown.Item eventKey="No">No</Dropdown.Item>
                  </DropdownButton>
                </td>  
                <td><Form.Control type="text" disabled={!row.plusOneSelected || row.plusOneSelected === 'No'}/></td>
                <td><Form.Control type="text" disabled={!row.plusOneSelected || row.plusOneSelected === 'No'}/></td>
                <td>
                  <Form.Range 
                    min={1} 
                    max={5} 
                    step={0.5} 
                    disabled={!row.plusOneSelected || row.plusOneSelected === 'No'}
                    value={plusOneValue[index]} 
                    onChange={(e) => handleRangeChangePlusOne(index, e)} 
                  />
                  <p>Selected Value: {plusOneValue[index]}</p> 
                </td>
                <td>
                  <DropdownButton variant="outline-secondary" title={row.addOnSelected ? 'Yes' : (row.addOnSelected === false ? 'No' : 'Select One')} onSelect={(value) => handleAddOnSelectChange(index, value)}>
                    <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                    <Dropdown.Item eventKey="No">No</Dropdown.Item>
                  </DropdownButton>
                </td>
                <td><Form.Control type="text" disabled={!row.addOnSelected || row.addOnSelected === 'No'}/></td>
                <td><Form.Control type="text" disabled={!row.addOnSelected || row.addOnSelected === 'No'}/></td>
                <td>
                  <Form.Range 
                    min={1} 
                    max={5} 
                    step={0.5} 
                    disabled={!row.addOnSelected || row.addOnSelected === 'No'}
                    value={addOnValue[index]} 
                    onChange={(e) => handleRangeChangeAddOn(index, e)} 
                  />
                  <p>Selected Value: {addOnValue[index]}</p> 
                </td>
                <td>
                  <DropdownButton variant="outline-secondary" title={row.extraAddOnSelected ? 'Yes' : (row.extraAddOnSelected === false ? 'No' : 'Select One')} onSelect={(value) => handleExtraAddOnSelectChange(index, value)}>
                    <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                    <Dropdown.Item eventKey="No">No</Dropdown.Item>
                  </DropdownButton>
                </td>
                <td>
                <DropdownButton variant="outline-secondary" onSelect={(eventKey) => handleSelectedNumber(index, eventKey)} title={row.selectedAddOns}>
                    {generateDropdownOptions()}
                  </DropdownButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <Button className='add-row-button' onClick={addRow}>Add Row</Button>
        </div>
      </Form>
    </div>
  );
}

export default EverybodyElse;
