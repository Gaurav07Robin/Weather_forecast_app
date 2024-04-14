import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CitiesTable from './CitiesTable';
import WeatherTable from './weatherTable';


function App() {
  
  return (
    <div >
<h1>Weather App</h1>

    <Router>
     <Routes>
        <Route path="/" element={<CitiesTable/>} />
        <Route path="/weather/:cityName" element={<WeatherTable/>} />
      </Routes>
    </Router>


    </div>
  );
}

export default App;
