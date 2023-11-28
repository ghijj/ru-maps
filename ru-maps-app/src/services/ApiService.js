import axios from 'axios';

const apiUrl = 'https://api.openrouteservice.org/v2/directions/walking';

const apiKey = 'YOUR_OPENROUTESERVICE_API_KEY'; // Replace with your API key

const getWalkingTime = async (startAddress, endAddress) => {
  try {
    const response = await axios.post(apiUrl, {
      coordinates: [
        [startAddress.longitude, startAddress.latitude],
        [endAddress.longitude, endAddress.latitude],
      ],
      profile: 'foot-walking',
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Extract walking distance from the response
    const walkingDistance = response.data.features[0].properties.segments[0].distance;

    return walkingDistance;
  } catch (error) {
    console.error('Error calculating walking distance:', error);
    throw error;
  }
};

export default getWalkingTime;