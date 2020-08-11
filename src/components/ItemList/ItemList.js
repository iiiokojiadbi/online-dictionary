import React from 'react';
import classes from './ItemList.module.css';

const ItemList = ({ word }) => {
  return (
    <li className={classes.item}>
      <button type="button" className={classes.star}></button>
      <span className={classes.name}>{word}</span>
      <span className={classes.part}>verb</span>
      <span className={classes.definition}>
        disinclined to activity or exertion : not energetic or vigorous
      </span>
      <button type="button" className={classes.star}></button>
    </li>
  );
};

export default ItemList;
