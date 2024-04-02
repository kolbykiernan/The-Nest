import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link component
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

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questionnaire" element={<Questionnaire categories={categories} fetchCategories={fetchCategories} />} />
          <Route path="/guestlist" element={<Guestlist categories={categories} />} />
          <Route path="/seatingchart" element={<Seatingchart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
