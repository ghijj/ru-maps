// BuildingInput.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import BuildingOptionsService from '../services/BuildingOptionsService';

const BuildingInput = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [buildingOptions, setBuildingOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const options = await BuildingOptionsService.fetchBuildingOptions();
      console.log('Options:', options);
      setBuildingOptions(options);
    };

    fetchOptions();
  }, []);

//   const handleInputChange = (newValue) => {
//     setInputValue(newValue);
//   };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div>
      <Select
        options={buildingOptions}
        value={buildingOptions.find((opt) => opt.value === inputValue)}
        onChange={(selectedOption) => setInputValue(selectedOption.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default BuildingInput;