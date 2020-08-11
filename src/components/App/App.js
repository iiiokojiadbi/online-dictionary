import React, { Component } from 'react';
import classes from './App.module.css';
import './../../fonts/PTSans.css';
import DictionaryApi from './../../service/Api';
import Header from './../Header/Header';
import Keeper from './../Keeper/Keeper';

import { ListWordsContext } from './../../context/ListWordsContext';

export default class App extends Component {
  _api = new DictionaryApi();

  state = {
    listWords: [],
    word: 'awes',
  };

  componentDidMount() {
    this.refreshListWords();
  }

  refreshListWords() {
    const { word } = this.state;

    this._api.getListWords({ word: this.state.word }).then((listWords) => {
      this.setState({
        listWords: [...listWords],
      });
    });
  }

  render() {
    const { listWords } = this.state;

    return (
      <div className={classes.app}>
        <Header />
        <ListWordsContext.Provider value={listWords}>
          <Keeper listWords={listWords} />
        </ListWordsContext.Provider>
      </div>
    );
  }
}
