import axios from 'axios';

// const apiUrl = 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248b6f844c6bf6d4060b09c6632e88b387a&start=8.681495,49.41461&end=8.687872,49.420318';

// const apiKey = '5b3ce3597851110001cf6248b6f844c6bf6d4060b09c6632e88b387a'; // Replace with API key



export async function getWalkingTime1(startCoordinates, endCoordinates) {
  const apiKey = '5b3ce3597851110001cf6248b6f844c6bf6d4060b09c6632e88b387a';

  const apiUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoordinates}&end=${endCoordinates}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Extract walking time from the response
    const walkingTime = data.features[0].properties.segments[0].duration;

    return walkingTime;
  } catch (error) {
    console.error('Error fetching walking directions:', error);
    throw error;
  }
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