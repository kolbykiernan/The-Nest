import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

export default function BrideGroom() {

    const [firstBrideSelection, setFirstBrideSelection] = useState(true); // Initially selecting "Bride" for the first dropdown
    const [firstGroomSelection, setFirstGroomSelection] = useState(false); // Initially selecting "Groom" for the second dropdown
    const [secondBrideSelection, setSecondBrideSelection] = useState(false); // Initially selecting "Bride" for the first dropdown
    const [secondGroomSelection, setSecondGroomSelection] = useState(true); // Initially selecting "Groom" for the second dropdown
  

    // Function to handle bride selection for the first dropdown
    const handleBrideSelectionFirstDropdown = () => {
        setFirstBrideSelection(true);
        setFirstGroomSelection(false);
    };
  
    // Function to handle groom selection for the first dropdown
    const handleGroomSelectionFirstDropdown = () => {
        setFirstBrideSelection(false);
        setFirstGroomSelection(true);
    };

    // Function to handle groom selection for the second dropdown
    const handleGroomSelectionSecondDropdown = () => {
        setSecondBrideSelection(false);
        setSecondGroomSelection(true);
    };

    // Function to handle bride selection for the second dropdown
    const handleBrideSelectionSecondDropdown = () => {
        setSecondBrideSelection(true);
        setSecondGroomSelection(false);
    };
  
  return (
    <div className='bride-groom-form'>
        <div className='bride-groom-spacing'>
            <Form.Control size="lg" type="text" placeholder="First Name" className='firstName-spacing'/>
            <Form.Control size="lg" type="text" placeholder="Last Name" className='lastName-spacing'/>
            <Dropdown data-bs-theme="dark" >
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="outline-secondary" className="bride-groom-dropdown">
                {firstBrideSelection ? "Bride" : "Groom"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item active={firstBrideSelection} onClick={handleBrideSelectionFirstDropdown}>Bride</Dropdown.Item>
                    <Dropdown.Item active={firstGroomSelection} onClick={handleGroomSelectionFirstDropdown}>Groom</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        <div className='bride-groom-spacing'>
            <Form.Control size="lg" type="text" placeholder="First Name" className='firstName-spacing'/>
            <Form.Control size="lg" type="text" placeholder="Last Name" className='lastName-spacing'/>
            <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle id="dropdown-button-dark-example2" variant="outline-secondary" className="bride-groom-dropdown">
                {secondGroomSelection ? "Groom" : "Bride"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item active={secondGroomSelection} onClick={handleGroomSelectionSecondDropdown}>Groom</Dropdown.Item>
                    <Dropdown.Item active={secondBrideSelection} onClick={handleBrideSelectionSecondDropdown}>Bride</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
  )
}
