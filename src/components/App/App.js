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
    word: 'oke',
  };

  componentDidMount() {
    this.refreshListWords();
  }

  refreshListWords() {
    const { word } = this.state;

    this._api.getListWords({ word }).then(async (listWords) => {
      listWords.map(async (word) => {
        const infWord = await this._api.getInfoWord(word);

        this.setState({
          listWords: [...this.state.listWords, infWord],
        });
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
