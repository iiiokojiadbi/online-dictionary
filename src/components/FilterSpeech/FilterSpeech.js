import React, { useState, useEffect, useContext } from 'react';
import classes from './FilterSpeech.module.css';

import { HandleSetPathOfSpeechContext } from './../../context/HandleSetPathOfSpeechContext';

const FilterSpeech = () => {
  const handlseSetPathOfSpeech = useContext(HandleSetPathOfSpeechContext);

  const [pathOfSpeech, setPathOfSpeech] = useState('');

  useEffect(() => {
    handlseSetPathOfSpeech({ pathOfSpeech });
  }, [pathOfSpeech, handlseSetPathOfSpeech]);

  const handleChangeCheckbox = (evt) => {
    const { value } = evt.target;
    if (pathOfSpeech === value) {
      setPathOfSpeech('');
    } else {
      setPathOfSpeech(value);
    }
  };

  return (
    <div className={classes.filterSpeech}>
      <label className={classes.label}>
        <input
          className={classes.checkbox}
          name="pathofspeech"
          type="checkbox"
          value="noun"
          checked={pathOfSpeech === 'noun'}
          onChange={handleChangeCheckbox}
        />
        <span className={classes.title}>noun</span>
      </label>
      <label className={classes.label}>
        <input
          className={classes.checkbox}
          name="pathofspeech"
          type="checkbox"
          value="verb"
          checked={pathOfSpeech === 'verb'}
          onChange={handleChangeCheckbox}
        />
        <span className={classes.title}>verb</span>
      </label>
      <label className={classes.label}>
        <input
          className={classes.checkbox}
          name="pathofspeech"
          type="checkbox"
          value="adjective"
          checked={pathOfSpeech === 'adjective'}
          onChange={handleChangeCheckbox}
        />
        <span className={classes.title}>adjective</span>
      </label>
    </div>
  );
};

export default FilterSpeech;
