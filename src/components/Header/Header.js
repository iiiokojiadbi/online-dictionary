import React from 'react';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <button type="button">Word Keeper</button>
      <button type="button">&#9733; Starred Words</button>
    </header>
  );
};

export default Header;
