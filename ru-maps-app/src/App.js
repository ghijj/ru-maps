import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import BuildingInput from './components/BuildingInputs';
import BuildingOptionsService from './services/BuildingOptionsService';
import { getWalkingTime1 } from './services/ApiService'; 

const App = () => {
  const [walkingTimes, setWalkingTimes] = useState([]);
  
  const formatWalkingTime = (walkingTime) => {
    const minutes = Math.floor(walkingTime / 60);
    const seconds = Math.round(walkingTime % 60); // Round seconds to the nearest whole number
    return `${minutes} minutes, ${seconds} seconds`;
  };

  const handleSearch = async (selectedBuilding) => {
    try {
      // Get the coordinates of the selected building from buildingOptions.json
      const buildingOptions = await BuildingOptionsService.fetchBuildingOptions();
      const selectedBuildingData = buildingOptions.find(option => option.value === selectedBuilding);
  
      if (!selectedBuildingData) {
        console.error('Selected building data not found.');
        return;
      }
      console.log(selectedBuildingData);
      
      let stopData;
      switch (selectedBuildingData.campus) {
        case "CA":
          stopData = await fetch(process.env.PUBLIC_URL + '/caStops.json').then(response => response.json());
          console.log("is CA");
          break;
      
        case "Busch":
          stopData = await fetch(process.env.PUBLIC_URL + '/buschStops.json').then(response => response.json());
          console.log("is Busch");
          break;
      
        case "Livingston":
          stopData = await fetch(process.env.PUBLIC_URL + '/livingstonStops.json').then(response => response.json());
          console.log("is Livingston");
          break;
      
        case "C/D":
          stopData = await fetch(process.env.PUBLIC_URL + '/cdStops.json').then(response => response.json());
          console.log("is C/D");
          break;
      
        default:
          console.log("Unknown campus");
          break;
      }
      
      console.log(stopData);
      const buildingsToCheck = stopData.map(item => item.value) // get the buildings we want to check for the campus we are looking at

      const times = await Promise.all(
        buildingsToCheck.map(async (targetBuilding) => {
          const targetBuildingData = stopData.find(stop => stop.value === targetBuilding);

          if (!targetBuildingData) {
            console.error(`Data for ${targetBuilding} not found.`);
            return { targetBuilding, walkingTime: null };
          }

          const { longitude: targetLongitude, latitude: targetLatitude } = targetBuildingData;
          const startLocation = '-74.448343,40.499542'; //scott hall
          const endLocation =  '-74.447069,40.501486'; //graduate school of education building
          // Call getWalkingTime1 asynchronously
          const walkingTime = await getWalkingTime1(startLocation, endLocation);

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
          Walking time from {item.targetBuilding}: {formatWalkingTime(item.walkingTime)}
        </div>
      ))}
    </div>
  );
};

export default App;