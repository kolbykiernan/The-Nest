import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './HomePage'; 
import Questionnaire from './Questionnaire';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element = {<HomePage/>} />
          <Route exact path='/questionnaire' element = {<Questionnaire/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
