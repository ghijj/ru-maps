// ApiService.js
import axios from 'axios';

const getWalkingTime = async (startBuilding, endBuilding) => {
  // Make API request to OpenStreetMaps for walking time
  // Example: https://your-api-endpoint/walking-time?start=Building1&end=Building2
  const response = await axios.get(`https://your-api-endpoint/walking-time`, {
    params: {
      start: startBuilding,
      end: endBuilding,
    },
  });
  return response.data;
};

export default { getWalkingTime };