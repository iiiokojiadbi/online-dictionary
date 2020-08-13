import React, { useContext } from 'react';
import classes from './ListItems.module.css';
import ItemList from './../ItemList/ItemList';

import { ListWordsContext } from './../../context/ListWordsContext';
import { HandleStarredWordContext } from './../../context/HandleStarredWordContext';

const ListItems = () => {
  const listWords = useContext(ListWordsContext);
  const handleStarredWord = useContext(HandleStarredWordContext);

  const words = listWords
    ? listWords.map((word) => {
        return (
          <ItemList
            key={word.word}
            {...word}
            handleClick={() => {
              handleStarredWord({ word });
            }}
          />
        );
      })
    : null;

  const isEmpty = !words.length ? <ItemList isEmpty /> : words;

  return <ul className={classes.listItems}>{isEmpty}</ul>;
};

export default ListItems;
