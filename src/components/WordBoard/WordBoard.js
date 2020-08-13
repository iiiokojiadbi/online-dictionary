import React, { Component } from 'react';
import classes from './WordBoard.module.css';
import SearchPanel from './../SearchPanel/SearchPanel';
import ListItems from './../ListItems/ListItems';

export default class WordBoard extends Component {
  render() {
    return (
      <section className={classes.wordBoard}>
        <SearchPanel />
        <ListItems />
      </section>
    );
  }
}
