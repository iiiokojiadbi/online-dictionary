import React from 'react';
import classes from './ItemList.module.css';

const ItemList = ({ word, results, starred, handleClick, isEmpty = false }) => {
  const renderResults = (info) => {
    const infoWord = info !== undefined ? info['0'] : null;
    const { partOfSpeech, definition } = infoWord || {
      partOfSpeech: 'missing',
      definition: 'is missing',
    };

    const domElements = (
      <React.Fragment key={word}>
        <button type="button" className={classes.burger}></button>
        <span className={classes.name}>{word}</span>
        <span className={classes.part}>{partOfSpeech}</span>
        <span className={classes.definition}>Definition: {definition}</span>
        <button
          type="button"
          onClick={handleClick}
          className={`${classes.star} ${starred ? classes.star__active : null}`}
        ></button>
      </React.Fragment>
    );

    return domElements;
  };

  if (!isEmpty) {
    return <li className={classes.item}>{renderResults(results)}</li>;
  } else {
    return <li></li>;
  }
};

export default ItemList;
