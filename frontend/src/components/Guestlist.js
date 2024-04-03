import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from '../default-views/header';
import Footer from '../default-views/Footer';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';

export default function Guestlist({ categories, bridesmaidsData, groomsmenData, everybodyElseData, setBridesmaidsData, setGroomsmenData, setEverybodyElseData }) {
  const [totalRows, setTotalRows] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log('Fetching bridesmaids data...');
  //       const bridesmaidsResponse = await axios.get('http://localhost:3000/api/bridesmaids');
  //       console.log('Fetched bridesmaids data:', bridesmaidsResponse.data);
  //       setBridesmaidsData(bridesmaidsResponse.data);
  
  //       console.log('Fetching groomsmen data...');
  //       const groomsmenResponse = await axios.get('http://localhost:3000/api/groomsmen');
  //       console.log('Fetched groomsmen data:', groomsmenResponse.data);
  //       setGroomsmenData(groomsmenResponse.data);
  
  //       console.log('Fetching everybody else data...');
  //       const everybodyElseResponse = await axios.get('http://localhost:3000/api/everybodyelse');
  //       console.log('Fetched everybody else data:', everybodyElseResponse.data);
  //       setEverybodyElseData(everybodyElseResponse.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);
  
 
  
  

  useEffect(() => {

    const total = bridesmaidsData.length + groomsmenData.length + everybodyElseData.length;
    setTotalRows(total);
  }, [bridesmaidsData, groomsmenData, everybodyElseData]);

  const toggleVisibility = () => {
    return formSubmitted ? '' : 'hide'; 
  };

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

  const renderRow = (data, indexOffset) => {
    return data.flatMap((item, index) => {
      const rows = [];
      rows.push(
        <tr key={index + indexOffset}>
          <td>{index + 1 + indexOffset}</td>
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
  
      // Check if plusOneSelectedBridesmaids is 'Yes' for bridesmaids data
      if (data === bridesmaidsData && item.plusOneSelectedBridesmaids === true) {
        rows.push(
          <tr key={index + indexOffset + 1}>
            <td>{index + 1 + indexOffset + 1}</td>
            <td>{item.plusOneFirstName}</td>
            <td>{item.plusOneLastName}</td>
            <td>
              {item.brideGroomOrMutual}
            </td>
            <td>{item.selectedCategory}</td>
            <td>{item.plusOneValueBridesmaids}</td>
          </tr>
        );
      }

      if (data === groomsmenData && item.plusOneSelectedGroomsmen === true) {
        rows.push(
          <tr key={index + indexOffset + 1}>
            <td>{index + 1 + indexOffset + 1}</td>
            <td>{item.plusOneFirstName}</td>
            <td>{item.plusOneLastName}</td>
            <td>
              {item.brideGroomOrMutual}
            </td>
            <td>{item.selectedCategory}</td>
            <td>{item.plusOneValueGroomsmen}</td>
          </tr>
        );
      }

      if (data === everybodyElseData && item.plusOneSelected === true) {
        rows.push(
          <tr key={index + indexOffset + 1}>
            <td>{index + 1 + indexOffset + 1}</td>
            <td>{item.plusOneFirstName}</td>
            <td>{item.plusOneLastName}</td>
            <td>
              {item.brideGroomOrMutual}
            </td>
            <td>{item.selectedCategory}</td>
            <td>{item.plusOneValueEverybodyElse}</td>
          </tr>
        );
      }
  
      return rows;
    });
  };

  return (
    <div className='guestlist'>
      <Header />
      <div className={`guestlist-body ${toggleVisibility()}`}>
        <div className="guestlist-sidebar">
          <Sidebar />
        </div>
        <div className="guestlist-table">
          <div>
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
          </div>
          <div className="scrollable-table">
          {formSubmitted ? (
              <Table responsive="sm">
                <thead>
                  <tr>
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
                  {renderRow(groomsmenData, bridesmaidsData.length)}
                  {renderRow(everybodyElseData, bridesmaidsData.length + groomsmenData.length)}
                </tbody>
              </Table>
            ) : (
              <div className="message">Please fill out and submit the questionnaire before viewing your guest list. You will still be able to make adjustments here!</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
