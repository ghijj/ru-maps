const fetchBuildingOptions = async () => {
  try {
    const response = await fetch(process.env.PUBLIC_URL + '/buildingOptions.json');
    const data = await response.json();

    const options = data.map(item => ({
      label: item.building, // Use "label" for the display value in React Select
      value: item.building, // Use "value" for the actual value in React Select
      coordinates: item.coordinates,
      campus: item.campus
    }));

    return options;
  } catch (error) {
    console.error('Error fetching building options:', error);
    return [];
  }
};

export default { fetchBuildingOptions };