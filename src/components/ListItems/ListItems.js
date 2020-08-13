import React, { useContext, useEffect, useState, useCallback } from 'react';
import classes from './ListItems.module.css';
import ItemList from './../ItemList/ItemList';

import { ListWordsContext } from './../../context/ListWordsContext';
import { HandleStarredWordContext } from './../../context/HandleStarredWordContext';
import { HandleOpenInfoPopup } from './../../context/HandleOpenInfoPopup';
import { IsStarredContext } from './../../context/IsStarredContext';

const ListItems = () => {
  const listWords = useContext(ListWordsContext);
  const { handleStarredWord, handleUpdateStorageStarred } = useContext(
    HandleStarredWordContext
  );
  const handleOpenInfoPopup = useContext(HandleOpenInfoPopup);
  const isStarred = useContext(IsStarredContext);

  const [afterElementPosition, setAfterElementPosition] = useState(0);
  const [elementDrop, setElementDrop] = useState('');

  const updateLocalStorage = useCallback(handleUpdateStorageStarred);

  useEffect(() => {
    if (isStarred && elementDrop && afterElementPosition) {
      updateLocalStorage({
        newPostion: afterElementPosition,
        elementDrop: elementDrop,
      });
    }
  }, [elementDrop, afterElementPosition]);

  const drop = (evt) => {
    if (isStarred) {
      evt.preventDefault();
      const card_id = evt.dataTransfer.getData('card_id');
      const card = document.getElementById(card_id);
      const { element } = getDragAfterElement(evt.target, evt.clientY);
      if (element == null) {
        evt.target.appendChild(card);
      } else {
        evt.target.insertBefore(card, element);
      }

      const word = listWords.find((item) => item.word === card.id);
      const afterWordIndex = listWords.findIndex(
        (item) => item.word === element.id
      );

      setElementDrop(word);
      setAfterElementPosition(afterWordIndex);
    }
  };

  const dragOver = (evt) => {
    evt.preventDefault();
  };

  const words = listWords
    ? listWords.map((word) => {
        return (
          <ItemList
            key={word.word}
            {...word}
            draggable={isStarred}
            handleClickStar={() => {
              handleStarredWord({ word });
            }}
            handleOpenInfo={() => {
              handleOpenInfoPopup({ word: word });
            }}
          />
        );
      })
    : null;

  const items = !words.length ? <ItemList isEmpty /> : words;

  return (
    <ul
      className={classes.listItems}
      onDrop={drop}
      onDragOver={dragOver}
      id={'container'}
    >
      {items}
    </ul>
  );
};

export default ListItems;

function getDragAfterElement(container, y) {
  const draggableElements = subscribeDraggableElements(container);

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  );
}

function subscribeDraggableElements(container) {
  return [...container.querySelectorAll('.draggable:not(.dragging)')];
}
