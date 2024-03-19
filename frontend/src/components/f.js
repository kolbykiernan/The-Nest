import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';


const EverybodyElse = ({ categories, selectedCategory, handleSelectChange }) => {

    const [extraAddOnValue, setExtraAddOnValue] = useState(Array.from({ length: 5 }, () => 1));
    const [extraAddOnSelected, setExtraAddOnSelected] = useState('');

    const handleRangeChangeExtraAddOn = (index, e) => {
        const newValuesExtraAddOn = [...extraAddOnValue];
        newValuesExtraAddOn[index] = parseFloat(e.target.value);
        setExtraAddOnValue(newValuesExtraAddOn);
    };

    const handleExtraAddOnSelectChange = (index, value) => {
        setRows(prevRows => {
        const updatedRows = [...prevRows];
        updatedRows[index] = { ...updatedRows[index], extraAddOnSelected: value === 'Yes' };
        return updatedRows;
        });
    };

  return (
    <div className='wedding-party-form'  >
<Form className="row-fluid" >
<Table responsive="sm" className='table'>
  <thead >
    <tr >
      <th>Add-On First Name</th>
      <th>Add-On Last Name</th>
      <th>How important is it that this add-on comes?</th>
      <th>Are there any other guests you'd like to add-on to this guest?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
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
      </tr>
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
