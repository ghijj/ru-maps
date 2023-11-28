const fetchBuildingOptions = async () => {
  try {
    const response = await fetch(process.env.PUBLIC_URL + '/buildingOptions.json');
    const data = await response.json();

    // Assuming your JSON structure is an array of objects with "building," "longitude," and "latitude" properties
    const options = data.map(item => ({
      label: item.building, // Use "label" for the display value in React Select
      value: item.building, // Use "value" for the actual value in React Select
      longitude: item.longitude,
      latitude: item.latitude
    }));

    return options;
  } catch (error) {
    console.error('Error fetching building options:', error);
    return [];
  }
};

export default { fetchBuildingOptions };