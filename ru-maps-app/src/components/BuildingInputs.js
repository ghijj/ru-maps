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
    <div style={{ textAlign: 'left', margin: '20px' }}>
      <Select
        options={buildingOptions} 
        value={buildingOptions.find((opt) => opt.value === inputValue)}
        onChange={(selectedOption) => setInputValue(selectedOption.value)}
        styles={{
          control: (provided, state) => ({
            ...provided,
            fontFamily: "Verdana , serif",
            color: '#fff',
            border: state.isFocused ? '2px solid #61dafb' : '1px solid #ccc',
            boxShadow: state.isFocused ? '0 0 5px rgba(97, 218, 251, 0.7)' : 'none',
            borderRadius: '8px',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#61dafb' : 'white',
            color: state.isSelected ? 'white' : 'black',
          }),
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          marginTop:'10px',
          backgroundColor: '#5a5a5a',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontFamily: "Verdana , serif",
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </div>
  );
  };  

export default BuildingInput;