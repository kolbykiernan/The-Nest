import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import HamburgerMenu from '../images/Hamburger_icon.svg.png'

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true); // state to track sidebar visibility

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded); // toggle the state between true and false
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
    <div className='sidebar-header'>
      <div className="toggle" onClick={toggleSidebar}>
        <img src={HamburgerMenu}/>
      </div>
      {isExpanded && (
        <div className='sidebar-header-font'>
          Analysis
        </div>
      )}
    </div>
      {isExpanded && (
        <div className="sidebar-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Sed ut perspiciatis unde omnis iste natus error sit volupt
        </div>
      )}
      <div className='sidebar-footer'>
        <Button>Refresh</Button>
      </div>
      
    </div>
  );
};

export default Sidebar;