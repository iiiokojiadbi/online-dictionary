import React, { useState, useContext } from 'react';
import classes from './Input.module.css';

import { SearchValueContext } from './../../context/SearchValueContext';

const Input = () => {
  const { handleChangeSearch, inputWord = '' } = useContext(SearchValueContext);

  const [inputValue, setInputValue] = useState(inputWord);

  const handleChange = (evt) => {
    const { value } = evt.target;
    handleChangeSearch({ word: value });
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
