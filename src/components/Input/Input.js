import React, { useState, useContext } from 'react';
import classes from './Input.module.css';

import { SearchValueContext } from './../../context/SearchValueContext';

const Input = () => {
  const handleChangeInputValue = useContext(SearchValueContext);

  const [inputValue, setInputValue] = useState('');

  const handleChange = (evt) => {
    const { value } = evt.target;
    handleChangeInputValue({ word: value });
    setInputValue(value);
  };

  return (
    <input
      className={classes.input}
      placeholder="Type to search"
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default Input;
