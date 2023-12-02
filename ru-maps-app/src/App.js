import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import BuildingInput from './components/BuildingInputs';
import BuildingOptionsService from './services/BuildingOptionsService';
import { getWalkingTime1 } from './services/ApiService'; 

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
  
      // Get the coordinates of the other stops from caStops.json
      const caStopsResponse = await fetch(process.env.PUBLIC_URL + '/caStops.json');
      const caStopsData = await caStopsResponse.json();
      console.log(caStopsData);
      const buildingsToCheck = ['College Ave Student Center', 'Student Activity Center', 'The Yard'];
  
      const times = await Promise.all(
        buildingsToCheck.map(async (targetBuilding) => {
          const targetBuildingData = caStopsData.find(stop => stop.value === targetBuilding);
  
          if (!targetBuildingData) {
            console.error(`Data for ${targetBuilding} not found.`);
            return { targetBuilding, walkingTime: null };
          }
          return { targetBuilding, walkingTime: 1 }; //this is just here for testing because otherwise it will runtime error cuz ApiService is not implemented yet. 
          /*const { longitude: targetLongitude, latitude: targetLatitude } = targetBuildingData;
  
          // Call ApiService.getWalkingTime
          const [walkingTime, setWalkingTime] = useState(null);
          const startLocation = {
            longitude: 10.12345,
            latitude: 20.67890
          };
          const endLocation = {
            longitude: 20.12345,
            latitude: 10.67890
          };
          useEffect(() => {
            getWalkingTime1(startLocation, endLocation)
              .then(walkingTime => {
                setWalkingTime(walkingTime); // Save walking time to the state variable
              })
              .catch(error => {
                console.error(error);
              });
          }, []);
  
          return { targetBuilding, walkingTime }; */
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
          Walking time from {item.targetBuilding}: {item.walkingTime} minutes
        </div>
      ))}
    </div>
  );
};

export default App;