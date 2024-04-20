import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import HamburgerMenu from '../images/Hamburger_icon.svg.png'

const Sidebar = ({ analysisMessage, desiredAttendance, venueCapacity, setVenueCapacity, handleInputChange, inviteCount, setInviteCount, setDesiredAttendance, costPerPerson, setCostPerPerson, runSortedList}) => {
  const [isExpanded, setIsExpanded] = useState(true); // state to track sidebar visibility
  
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded); // toggle the state between true and false
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className='sidebar-header'>
        <div className="toggle" onClick={toggleSidebar}>
          <img src={HamburgerMenu} alt="three line hamburger menu"/>
        </div>
        {isExpanded && (
          <div>
            <div className='sidebar-header-font'>
              Click the hamburger icon to toggle back and forth between your guest list. Fill these out and click 'Run List' to get a custom breakdown.
            </div>
          </div>
        )}
      </div>
      {isExpanded && (
        <div className='sidebar-inputs'>
          <div className='sidebar-capacity'>
            <div className='sidebar-capacity-text'>
              What is the capacity of the venue?
            </div>
            <div className='sidebar-capacity-input'>
              <Form.Control 
                type="number"
                value={venueCapacity}
                onChange={(e) => handleInputChange(e, setVenueCapacity, 'venueCapacity')}
              />
            </div>
          </div>
          <div className='sidebar-invites'>
            <div className='sidebar-invites-text'>
              How many guests would you like to invite?
            </div>
            <div className='sidebar-invites-input'>
              <Form.Control 
                type="number"
                value={inviteCount}
                onChange={(e) => handleInputChange(e, setInviteCount, 'inviteCount')}
              />
            </div>
          </div>
          <div className='sidebar-attendance'>
            <div className='sidebar-attendance-text'>
              How many guests would you like to attend?
            </div>
            <div className='sidebar-attendance-input'>
              <Form.Control 
                type="number"
                value={desiredAttendance}
                onChange={(e) => handleInputChange(e, setDesiredAttendance, 'desiredAttendance')}
              />
            </div>
          </div>
          <div className='sidebar-cost'>
            <div className='sidebar-cost-text'>
              How much does it cost per person?
            </div>
            <div className='sidebar-cost-input'>
              <Form.Control 
                type="number"
                value={costPerPerson}
                onChange={(e) => handleInputChange(e, setCostPerPerson, 'costPerPerson')}
              />
            </div>
          </div>
        </div>
      )}
      {isExpanded && (
        <div className="analysis-message">
          <p>
           {analysisMessage}
          </p>
        </div>
      )}
      {isExpanded && (
        <div className='run-list-button'>
          <Button onClick={runSortedList}>Run List</Button>
        </div>
      )}
    </div>
  );
  
};

export default Sidebar;