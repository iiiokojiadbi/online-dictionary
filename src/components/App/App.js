import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import classes from './App.module.css';
import './../../fonts/PTSans.css';
import DictionaryApi from './../../service/Api';
import Header from './../Header/Header';
import Keeper from './../Keeper/Keeper';

import { ListWordsContext } from './../../context/ListWordsContext';
import { SearchValueContext } from './../../context/SearchValueContext';

import _ from 'lodash';

export default class App extends Component {
  _api = new DictionaryApi();

  state = {
    listWords: [],
    starredWords: [],
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.state.word !== '' && this.state.word !== prevState.word) {
      this.refreshListWords();
    }
  }

  refreshListWords() {
    const { word } = this.state;

    this.setState({
      listWords: [],
    });

    this._api.getListWords({ word }).then(async (listWords) => {
      listWords.map(async (w) => {
        const infWord = await this._api.getInfoWord(w);
        this.setState({
          listWords: [...this.state.listWords, infWord],
        });
      });
    });
  }

  handleChangeSearchWord = ({ word }) => {
    this.setState({
      word: word,
    });
  };

  uniqSortFilter = (array) =>
    _.uniqWith(
      [...array]
        .sort((prev, next) => (prev.word < next.word ? -1 : 1))
        .filter((item) => item.word.includes(this.state.word))
        .slice(-10),
      _.isEqual
    );

  render() {
    const { listWords } = this.state;

    const uniqSortListWords = this.uniqSortFilter(listWords);

    return (
      <div className={classes.app}>
        <Header />
        <Switch>
          <Route exact path="/">
            <ListWordsContext.Provider value={uniqSortListWords}>
              <SearchValueContext.Provider value={this.handleChangeSearchWord}>
                <Keeper />
              </SearchValueContext.Provider>
            </ListWordsContext.Provider>
          </Route>
          <Route path="/starred"></Route>
        </Switch>
      </div>
    );
  }
}
