import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import CategoryDropdown from './CategoryDropdown';


const MaidOfHonor = ({categories, selectedCategory, handleSelectChange}) => {

  return (
    <div className='wedding-party-form'>
      <Form>
        <Form.Control size="lg" type="text" placeholder="First Name" className='firstName-spacing'/>
        <Form.Control size="lg" type="text" placeholder="Last Name" className='lastName-spacing'/>
        <Dropdown data-bs-theme="dark" >
            <CategoryDropdown categories={categories} value={selectedCategory} onChange={handleSelectChange} isDropdown={false} className="category-select"/>
        </Dropdown>
        
      </Form>   
    </div>
  )
}

export default MaidOfHonor;