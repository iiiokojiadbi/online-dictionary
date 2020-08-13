import React, { useState, useContext, useEffect, useRef } from 'react';
import classes from './Input.module.css';

import { SearchValueContext } from './../../context/SearchValueContext';
import { IsStarredContext } from './../../context/IsStarredContext';

const Input = () => {
  const { handleChangeSearch, inputWord = '' } = useContext(SearchValueContext);
  const isStarredBoard = useContext(IsStarredContext);

  const inputRef = useRef();

  const [inputValue, setInputValue] = useState(inputWord);

  useEffect(() => {
    if (isStarredBoard) {
      setInputValue('');
      const evt = new Event('input');
      inputRef.current.dispatchEvent(evt);
    }
  }, [isStarredBoard]);

  const handleChange = (evt) => {
    const { value } = evt.target;
    handleChangeSearch({ word: value });
    setInputValue(value);
  };

  return (
    <input
      ref={inputRef}
      className={classes.input}
      placeholder="Type to search"
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default Input;
