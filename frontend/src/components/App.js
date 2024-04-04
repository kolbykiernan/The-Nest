import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Link component
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './HomePage'; 
import Questionnaire from './Questionnaire';
import Guestlist from './Guestlist';
import Seatingchart from './seatingchart';
import axios from 'axios';

function App() {
  
  const [categories, setCategories] = useState([]);


  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } 
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log('Props in App.js:', categories, fetchCategories);

  const [bridesmaidsData, setBridesmaidsData] = useState(() => {
    const storedData = localStorage.getItem('bridesmaidsData');
    return storedData
      ? JSON.parse(storedData)
      : Array.from({ length: 10 }, (_, index) => ({
          id: index,
          firstName: '',
          lastName: '',
          selectedCategory: '',
          plusOneSelectedBridesmaids: '',
          plusOneFirstName: '',
          plusOneLastName: '',
          selectedRole: '',
          plusOneValueBridesmaids: 1,
        }));
  });

  const [groomsmenData, setGroomsmenData] = useState(() => {
    // Initialize groomsmenData from localStorage or with default values
    const storedData = localStorage.getItem('groomsmenData');
    return storedData ? JSON.parse(storedData) : Array.from({ length: 10 }, (_, index) => ({
        id: index, // Unique identifier for each row
        firstName: '',
        lastName: '',
        selectedCategory: '',
        plusOneSelectedGroomsmen: '',
        plusOneFirstName: '',
        plusOneLastName: '',
        selectedRole: '',
        plusOneValueGroomsmen: 1,
    }));
  });

  const [everybodyElseData, setEverybodyElseData] = useState(() => {
    // Initialize everybodyElseData from localStorage or with default values
    const storedData = localStorage.getItem('everybodyElseData');
    return storedData ? JSON.parse(storedData) : Array.from({ length: 10 }, (_, index) => ({
      id: index, // Unique identifier for each row
      firstName: '',
      lastName: '',
      selectedCategory: '',
      brideGroomOrMutual: '',
      guestValue: 1,
      plusOneSelected: '',
      plusOneFirstName: '',
      plusOneLastName: '',
      plusOneValue: 1,
      otherGuests: '',
      addOnFirstName: '',
      addOnLastName: '',
      addOnValue: 1,
      moreGuests: '',
      howMany: null,
    }))
});

  return (
    <Router>
          <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/questionnaire" 
            element={<Questionnaire 
                      categories={categories} 
                      fetchCategories={fetchCategories} 
                      bridesmaidsData={bridesmaidsData}
                      setBridesmaidsData={setBridesmaidsData}
                      groomsmenData={groomsmenData}
                      setGroomsmenData={setGroomsmenData}
                      everybodyElseData={everybodyElseData}
                      setEverybodyElseData={setEverybodyElseData}
                      />} />
          <Route 
            path="/guestlist" 
            element={<Guestlist 
                      categories={categories}
                      bridesmaidsData={bridesmaidsData}
                      setBridesmaidsData={setBridesmaidsData}
                      groomsmenData={groomsmenData}
                      setGroomsmenData={setGroomsmenData}
                      everybodyElseData={everybodyElseData}
                      setEverybodyElseData={setEverybodyElseData} 
                    />} />
          <Route path="/seatingchart" element={<Seatingchart />} />
          <Route path="*" element={<Navigate to="/" />} /> 
        </Routes>
        </div>
    </Router>
  );
}

export default App;