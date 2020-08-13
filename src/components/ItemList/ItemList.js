import React from 'react';
import classes from './ItemList.module.css';

const ItemList = ({
  word,
  results,
  starred,
  draggable,
  handleClickStar,
  handleOpenInfo,
  isEmpty = false,
}) => {
  const dragStart = (evt) => {
    evt.dataTransfer.setData('card_id', evt.target.id);
    evt.target.classList.add('dragging');
  };

  const dragOver = (evt) => {
    evt.stopPropagation();
  };

  const dragEnd = (evt) => {
    evt.target.classList.remove('dragging');
  };

  const renderResults = (info) => {
    const infoWord = info !== undefined ? info['0'] : null;
    const { partOfSpeech, definition } = infoWord || {
      partOfSpeech: 'missing',
      definition: 'is missing',
    };

    const domElements = (
      <React.Fragment key={word}>
        <div className={classes.burger}></div>
        <div className={classes.brief} onClick={handleOpenInfo}>
          <span className={classes.name}>{word}</span>
          <span className={classes.part}>{partOfSpeech}</span>
          <span className={classes.definition}>Definition: {definition}</span>
        </div>
        <button
          type="button"
          onClick={handleClickStar}
          className={`${classes.star} ${starred ? classes.star__active : null}`}
        ></button>
      </React.Fragment>
    );

    return domElements;
  };

  if (!isEmpty) {
    return (
      <li
        id={word}
        onDragStart={dragStart}
        onDragOver={dragOver}
        onDragEnd={dragEnd}
        draggable={draggable}
        className={`${classes.item} ${draggable ? 'draggable' : ''}`}
      >
        {renderResults(results)}
      </li>
    );
  } else {
    return <li></li>;
  }
};

export default ItemList;
