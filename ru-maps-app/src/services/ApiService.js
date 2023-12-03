import axios from 'axios';

const apiUrl = 'https://api.openrouteservice.org/v2/directions/walking';

const apiKey = '5b3ce3597851110001cf6248b6f844c6bf6d4060b09c6632e88b387a'; // Replace with API key



export const getWalkingTime1 = async (startLocation, endLocation) => {
  const baseUrl = 'https://api.openrouteservice.org/v2/directions/walking';

  const params = {
    api_key: apiKey,
    coordinates: [startLocation, endLocation],
  };
  return 2;
  return axios.post(baseUrl, params)
    .then(response => {
      const duration = response.data.features[0].properties.segments[0].duration;
      return duration; // Returning the walking time in seconds
    })
    .catch(error => {
      throw error;
    });
}

// module.exports = {
//   getWalkingTime1,
// };

// const getWalkingTime = async (startAddress, endAddress) => {
//   try {
//     const response = await axios.post(apiUrl, {
//       coordinates: [
//         [startAddress.longitude, startAddress.latitude],
//         [endAddress.longitude, endAddress.latitude],
//       ],
//       profile: 'foot-walking',
//     }, {
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     // Extract walking distance from the response
//     const walkingDistance = response.data.features[0].properties.segments[0].distance;

//     return walkingDistance;
//   } catch (error) {
//     console.error('Error calculating walking distance:', error);
//     throw error;
//   }
// };

export default getWalkingTime1;