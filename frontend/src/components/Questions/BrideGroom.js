import React, { useState } from 'react';
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

export default function BrideGroom({ handleAnswer, existingData }) {

        const [brideSelection, setBrideSelection] = useState('Bride');
        const [groomSelection, setGroomSelection] = useState('Groom');
        const [brideFirstName, setBrideFirstName] = useState('');
        const [brideLastName, setBrideLastName] = useState('');
        const [groomFirstName, setGroomFirstName] = useState('');
        const [groomLastName, setGroomLastName] = useState('');
      
        useEffect(() => {
            // Populate inputs with existing data, if available
            if (existingData) {
              setBrideFirstName(existingData.brideFirstName || '');
              setBrideLastName(existingData.brideLastName || '');
              setBrideSelection(existingData.brideSelection || 'Bride');
              setGroomFirstName(existingData.groomFirstName || '');
              setGroomLastName(existingData.groomLastName || '');
              setGroomSelection(existingData.groomSelection || 'Groom');
            }
          }, [existingData]);
      
       

    const handleSelection = (value, isBride) => {
        if (isBride) {
          setBrideSelection(value);
        } else {
          setGroomSelection(value);
        }
      };
    
      const handleFirstNameChange = (value, isBride) => {
        if (isBride) {
          setBrideFirstName(value);
        } else {
          setGroomFirstName(value);
        }
      };
    
      const handleLastNameChange = (value, isBride) => {
        if (isBride) {
          setBrideLastName(value);
        } else {
          setGroomLastName(value);
        }
      };

      useEffect(() => {
        // Update the answers whenever inputs change
        handleAnswer('brideFirstName', brideFirstName);
        handleAnswer('brideLastName', brideLastName);
        handleAnswer('brideSelection', brideSelection);
        handleAnswer('groomFirstName', groomFirstName);
        handleAnswer('groomLastName', groomLastName);
        handleAnswer('groomSelection', groomSelection);
      }, [brideFirstName, brideLastName, brideSelection, groomFirstName, groomLastName, groomSelection]);
    return (
        <div className='bride-groom-form'>
            <div className='bride-groom-spacing'>
                <Form.Control
                    size="lg"
                    type="text"
                    placeholder="First Name"
                    className='firstName-spacing'
                    value={brideFirstName}
                    onChange={(e) => handleFirstNameChange(e.target.value, true)}
                />
                <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Last Name"
                    className='lastName-spacing'
                    value={brideLastName}
                    onChange={(e) => handleLastNameChange(e.target.value, true)}
                />
                <Dropdown data-bs-theme="dark">
                    <Dropdown.Toggle variant="outline-secondary" className="bride-groom-dropdown">
                        {brideSelection}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSelection('Bride', true)}>Bride</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelection('Groom', true)}>Groom</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className='bride-groom-spacing'>
                <Form.Control
                    size="lg"
                    type="text"
                    placeholder="First Name"
                    className='firstName-spacing'
                    value={groomFirstName}
                    onChange={(e) => handleFirstNameChange(e.target.value, false)}
                />
                <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Last Name"
                    className='lastName-spacing'
                    value={groomLastName}
                    onChange={(e) => handleLastNameChange(e.target.value, false)}
                />
                <Dropdown data-bs-theme="dark">
                    <Dropdown.Toggle variant="outline-secondary" className="bride-groom-dropdown">
                        {groomSelection}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSelection('Groom', false)}>Groom</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelection('Bride', false)}>Bride</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}
