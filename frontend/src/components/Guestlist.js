import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from '../default-views/header';
import Footer from '../default-views/Footer';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';

export default function Guestlist({ categories, bridesmaidsData, setBridesmaidsData, groomsmenData, setGroomsmenData, everybodyElseData, setEverybodyElseData }) {
 
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bridesmaidsResponse = await axios.get('http://localhost:3000/api/bridesmaids');
        setBridesmaidsData(bridesmaidsResponse.data);

        const groomsmenResponse = await axios.get('http://localhost:3000/api/groomsmen');
        setGroomsmenData(groomsmenResponse.data);

        const everybodyElseResponse = await axios.get('http://localhost:3000/api/everybodyelse');
        setEverybodyElseData(everybodyElseResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setBridesmaidsData, setGroomsmenData, setEverybodyElseData]);

  const countPlusOnes = (data) => {
    return data.reduce((count, item) => {
      return count + (item.plusOneSelectedBridesmaids || item.plusOneSelectedGroomsmen || item.plusOneSelected ? 1 : 0);
    }, 0);
  };

const renderRow = (data, indexOffset) => {
  let rowIndex = indexOffset + 1;

  const rows = [];

  data.forEach((item) => {
    rows.push(
      <tr key={rowIndex}>
        <td>{rowIndex}</td>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>
          {data === bridesmaidsData ? 'Bridesmaid' : 
           data === groomsmenData ? 'Groomsman' : 
           item.brideGroomOrMutual}
        </td>
        <td>{item.selectedCategory}</td>
        <td>
          {data === bridesmaidsData || groomsmenData ? '5' : item.guestValue}
        </td>
      </tr>
    );

    rowIndex++;


   if (item.plusOneSelectedBridesmaids === 'true' || item.plusOneSelectedGroomsmen === 'true' || item.plusOneSelected === 'true') {    
      rows.push(
        <tr key={rowIndex}>
          <td>{rowIndex}</td>
          <td>{item.plusOneFirstName}</td>
          <td>{item.plusOneLastName}</td>
          <td>{item.brideGroomOrMutual}</td>
          <td>{item.selectedCategory}</td>
          <td>{item.plusOneValueBridesmaids || item.plusOneValueGroomsmen || item.guestValue}</td>
        </tr>
      );
      rowIndex++; 
    }
    
    if ((item.plusOneSelectedBridesmaids === 'true' || 
    item.plusOneSelectedGroomsmen === 'true' || 
    item.plusOneSelected === 'true') && 
    !item.plusOneFirstName) {
    item.plusOneFirstName = 'TBD';
    item.plusOneLastName = 'TBD';
    }

    if (!item.brideGroomOrMutual){
      item.brideGroomOrMutual = "+1"
    }

    if (item.otherGuests == true) {    
      rows.push(
        <tr key={rowIndex}>
          <td>{rowIndex}</td>
          <td>{item.addOnFirstName}</td>
          <td>{item.addOnLastName}</td>
          <td>{item.brideGroomOrMutual}</td>
          <td>{item.selectedCategory}</td>
          <td>{item.addOnValue}</td>
        </tr>
      );
      rowIndex++; 
    }


  });

  return rows;
};

  return (
    <div className='guestlist'>
      <Header />
      <div className={'guestlist-body'}>
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
                  {renderRow(bridesmaidsData, 0)}
                  {renderRow(groomsmenData, bridesmaidsData.length + countPlusOnes(bridesmaidsData))}
                  {renderRow(everybodyElseData, bridesmaidsData.length + groomsmenData.length + countPlusOnes(groomsmenData))}
                </tbody>
              </Table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
