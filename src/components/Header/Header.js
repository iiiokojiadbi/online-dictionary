import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <NavLink
        activeClassName={classes.active}
        className={classes.link}
        exact
        to="/"
      >
        Word Keeper
      </NavLink>
      <NavLink
        activeClassName={classes.active}
        className={classes.link}
        to="/starred"
      >
        &#9733; Starred Words
      </NavLink>
    </header>
  );
};

export default Header;
