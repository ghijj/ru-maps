// BuildingOptionsService.js
const fetchBuildingOptions = async () => {
    try {
      const response = await fetch(process.env.PUBLIC_URL + '/buildingOptions.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching building options:', error);
      return [];
    }
  };
  
  export default { fetchBuildingOptions };