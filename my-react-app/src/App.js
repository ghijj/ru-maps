// App.js
import React, { useState } from 'react';
import Header from './components/Header';
import BuildingInput from './components/BuildingInputs';
import ApiService from './services/ApiService';

const App = () => {
  const [walkingTimes, setWalkingTimes] = useState([]);
  
  const handleSearch = async (building) => {
    // Assuming Building2, Building3, and Building4 are fixed buildings. Assume only College Ave for now
    const buildingsToCheck = ['Building2', 'Building3', 'Building4'];

    const times = await Promise.all(
      buildingsToCheck.map((targetBuilding) =>
        ApiService.getWalkingTime(building, targetBuilding)
      )
    );

    setWalkingTimes(times);
  };

  return (
    <div>
      <Header title="RU MAPS" />
      <BuildingInput onSearch={handleSearch} />
      {walkingTimes.map((time, index) => (
        <div key={index}>
          Walking time to Building {index + 2}: {time} minutes
        </div>
      ))}
    </div>
  );
};

export default App;