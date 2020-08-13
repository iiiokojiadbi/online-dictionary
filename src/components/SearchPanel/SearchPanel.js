import React, { useContext } from 'react';
import classes from './SearchPanel.module.css';
import Input from './../Input/Input';
import FilterSpeech from './../FilterSpeech/FilterSpeech';

import { IsStarredContext } from './../../context/IsStarredContext';

const SearchPanel = () => {
  const isStarredBoard = useContext(IsStarredContext);

  const filter = isStarredBoard ? <FilterSpeech /> : null;

  return (
    <div className={classes.searchPanel}>
      <div className={classes.wrapper}>
        <Input />
        {filter}
      </div>
    </div>
  );
};

export default SearchPanel;
