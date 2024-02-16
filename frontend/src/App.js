import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './views/HomePage'; 
import Header from './views/header';
import Footer from './views/Footer';
import Questionnaire from './views/questionnaire';


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
