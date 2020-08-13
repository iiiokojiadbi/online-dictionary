import React from 'react';
import classes from './SearchPanel.module.css';
import Input from './../Input/Input';
import FilterSpeech from './../FilterSpeech/FilterSpeech';

const SearchPanel = () => {
  return (
    <div className={classes.searchPanel}>
      <div className={classes.wrapper}>
        <Input />
        <FilterSpeech />
      </div>
    </div>
  );
};

export default SearchPanel;
