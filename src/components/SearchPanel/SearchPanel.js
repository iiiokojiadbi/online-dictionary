import React from 'react';
import classes from './SearchPanel.module.css';
import Input from './../Input/Input';

const SearchPanel = () => {

  return (
    <div className={classes.searchPanel}>
      <div className={classes.wrapper}>
        <Input />
      </div>
    </div>
  );
};

export default SearchPanel;
