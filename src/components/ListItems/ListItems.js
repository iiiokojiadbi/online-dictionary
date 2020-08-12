import React, { useContext } from 'react';
import classes from './ListItems.module.css';
import ItemList from './../ItemList/ItemList';

import { ListWordsContext } from './../../context/ListWordsContext';

const ListItems = () => {
  const listWords = useContext(ListWordsContext);

  const words = listWords
    ? listWords.map((word, i) => {
        return <ItemList key={i} {...word} />;
      })
    : null;

  return <ul className={classes.listItems}>{words}</ul>;
};

export default ListItems;
