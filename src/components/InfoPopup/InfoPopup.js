import React, { useEffect } from 'react';
import classes from './InfoPopup.module.css';

function InfoPopup({ word, pronunciation, results, onClose, isOpen }) {
  useEffect(() => {
    const handleEscListener = (evt) => {
      if (evt.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleEscListener);

    return () => document.removeEventListener('keydown', handleEscListener);
  }, [isOpen, onClose]);

  const handleOverlayClick = (evt) => {
    if (evt.target.classList.contains(classes.popup)) onClose();
  };

  const spelling = pronunciation?.all || '';

  const renderAdditionalDefinition = () => {
    if (results) {
      return results.map((item, i) => {
        return (
          <li key={i} className={classes.itemList}>
            <span className={classes.partOfSpeech}>
              <span className={classes.accent}> Path of speech: </span>
              {item.partOfSpeech}
            </span>
            <span className={classes.definition}>
              <span className={classes.accent}>Definition: </span>
              {item.definition}
            </span>
          </li>
        );
      });
    } else {
      return (
        <li className={classes.itemList}>
          <span className={classes.partOfSpeech}>
            <span className={classes.accent}> Path of speech: </span>is missing
          </span>
          <span className={classes.definition}>
            <span className={classes.accent}>Definition: </span>is missing
          </span>
        </li>
      );
    }
  };

  return (
    <section
      className={`${classes.popup} ${!isOpen ? classes.popupDisabled : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={classes.container}>
        <button
          type="button"
          className={classes.close}
          onClick={onClose}
        ></button>
        <div className={classes.info}>
          <h2 className={`${classes.title} ${!spelling && classes.center}`}>
            {word}
          </h2>
          {spelling && <span className={classes.spelling}>{spelling}</span>}
          <ul className={classes.list}>{renderAdditionalDefinition()}</ul>
        </div>
      </div>
    </section>
  );
}

export default InfoPopup;
