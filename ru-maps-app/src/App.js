import React, { useState } from 'react';
import Header from './components/Header';
import BuildingInput from './components/BuildingInputs';
import ApiService from './services/ApiService';
import BuildingOptionsService from './services/BuildingOptionsService';

const App = () => {
  const [walkingTimes, setWalkingTimes] = useState([]);
  
  const handleSearch = async (selectedBuilding) => {
    try {
      // Get the coordinates of the selected building from buildingOptions.json
      const buildingOptions = await BuildingOptionsService.fetchBuildingOptions();
      const selectedBuildingData = buildingOptions.find(option => option.value === selectedBuilding);
  
      if (!selectedBuildingData) {
        console.error('Selected building data not found.');
        return;
      }
  
      const { value, longitude, latitude } = selectedBuildingData;
  
      // Get the coordinates of the three other buildings from caStops.json
      const caStopsResponse = await fetch(process.env.PUBLIC_URL + '/caStops.json');
      const caStopsData = await caStopsResponse.json();
  
      const buildingsToCheck = ['Building2', 'Building3', 'Building4'];
  
      const times = await Promise.all(
        buildingsToCheck.map(async (targetBuilding) => {
          const targetBuildingData = caStopsData.find(stop => stop.value === targetBuilding);
  
          if (!targetBuildingData) {
            console.error(`Data for ${targetBuilding} not found.`);
            return { targetBuilding, walkingTime: null };
          }
  
          const { longitude: targetLongitude, latitude: targetLatitude } = targetBuildingData;
  
          // Call ApiService.getWalkingTime
          const walkingTime = await ApiService.getWalkingTime(
            { longitude, latitude },
            { longitude: targetLongitude, latitude: targetLatitude }
          );
  
          return { targetBuilding, walkingTime };
        })
      );
  
      // Update state with walking times
      setWalkingTimes(times);
    } catch (error) {
      console.error('Error handling search:', error);
    }
  };

  return (
    <div>
      <Header title="RU MAPS" />
      <BuildingInput onSearch={handleSearch} />
      {walkingTimes.map((item, index) => (
        <div key={index}>
          Walking time to {item.targetBuilding}: {item.walkingTime} seconds
        </div>
      ))}
    </div>
  );
};

export default App;