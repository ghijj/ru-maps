import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Subheader from './components/Subheader';
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
      
      const buildingsToCheck = stopData.map(item => item.value) // get the buildings we want to check for the campus we are looking at

      const times = await Promise.all(
        buildingsToCheck.map(async (targetBuilding) => {
          const targetBuildingData = stopData.find(stop => stop.value === targetBuilding);

          if (!targetBuildingData) {
            console.error(`Data for ${targetBuilding} not found.`);
            return { targetBuilding, walkingTime: null };
          }

          const { latitude: targetLatitude, longitude: targetLongitude } = targetBuildingData;
          const startLocation = targetBuildingData.coordinates; //
          const endLocation =  selectedBuildingData.coordinates; //graduate school of education building
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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // Your scroll animation logic here
    // For example, change the background color on scroll
    const scrollY = window.scrollY;
    if (scrollY > 100) {
  
    } else {
      document.body.style.backgroundColor = '#FFFFFF';
    }
  };


  return (
    <div className="App"
      style={{
      margin: '20px',
      padding: '15px',
      //textAlign: 'center',
      borderBottom: '1px',
    }}>
   
      <Header title="Rutgers Walk Times" />

      <BuildingInput onSearch={handleSearch} />
      {walkingTimes.map((item, index) => (
  <div
    key={index}
    className="BuildingOutput"
    style={{
      margin: '20px',
      padding: '15px',
      border: '2px solid #E4E4E4',
      borderRadius: '10px',
      fontSize: '25px',
      backgroundColor: '#f8f8f8',
      color: '#adadf7',
      boxShadow: '2px 4px 20px rgba(0, 0, 0, 0.05)',
      textAlign: 'center',
    }}
  >
    <span
      className="building-name"
      style={{
        color: '#34495E',
        fontWeight: 'bold',
      }}
    >
      {item.targetBuilding}
    </span>
    :{' '}
    <span
      className="walking-time"
      style={{
        color: '#5D6D7E',
        fontSize: '25px',
        fontWeight: 'bold',
      }}
    >
      {formatWalkingTime(item.walkingTime)}
      </span>{' '}
    </div>
))}
    </div>
  );
};

export default App;