import React, { useState, useContext, useEffect } from 'react';
import classes from './Input.module.css';

import { SearchValueContext } from './../../context/SearchValueContext';
import { IsStarredContext } from './../../context/IsStarredContext';

const Input = () => {
  const { handleChangeSearch, inputWord = '' } = useContext(SearchValueContext);
  const isStarred = useContext(IsStarredContext);

  const [inputValue, setInputValue] = useState(inputWord);
  const [delay, setDelay] = useState(true);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (!delay && !isStarred) {
      handleChangeSearch({ word: inputValue });
      setDelay(true);
    }

    if (isStarred) {
      handleChangeSearch({ word: inputValue });
    }
  }, [inputValue, delay, isStarred]);

  const handleChange = (evt) => {
    const { value } = evt.target;
    setInputValue(value);

    if (!isStarred) {
      clearTimeout(timer);
      const timerDelay = setTimeout(() => setDelay(false), 1500);
      setTimer(timerDelay);
    }
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
