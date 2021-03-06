import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = ({ toggleKeeper, toggleStarred }) => {
  return (
    <header className={classes.header}>
      <NavLink
        activeClassName={classes.active}
        className={classes.link}
        exact
        to="/online-dictionary/"
        onClick={toggleKeeper}
      >
        Word Keeper
      </NavLink>
      <NavLink
        activeClassName={classes.active}
        className={classes.link}
        to="/online-dictionary/starred"
        onClick={toggleStarred}
      >
        Starred Words
      </NavLink>
    </header>
  );
};

export default Header;
