import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import classes from './App.module.css';
import './../../fonts/PTSans.css';
import DictionaryApi from './../../service/Api';
import Header from './../Header/Header';
import Keeper from './../Keeper/Keeper';

import { ListWordsContext } from './../../context/ListWordsContext';
import { SearchValueContext } from './../../context/SearchValueContext';
import { HandleStarredWordContext } from './../../context/HandleStarredWordContext';

import _ from 'lodash';

export default class App extends Component {
  _api = new DictionaryApi();

  state = {
    listWords: [],
    starredWords: [],
    isStarred: false,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
    if (
      this.state.word !== '' &&
      this.state.word !== prevState.word &&
      this.state.isStarred === false
    ) {
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
        const infWord = { ...(await this._api.getInfoWord(w)), starred: false };
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

  handleChangeOnKeeper = () => {
    this.setState({
      isStarred: false,
    });
  };

  handleChangeOnStarred = () => {
    this.setState({
      isStarred: true,
    });
  };

  handleStarredWord = ({ word }) => {
    if (!word.starred) {
      this.setState({
        starredWords: [...this.state.starredWords, { ...word, starred: true }],
      });
    } else {
      const newListWord = this.state.starredWords.filter(
        (item) => item.word !== word.word
      );
      this.setState({
        starredWords: [...newListWord],
      });
    }
  };

  render() {
    const { listWords, starredWords, word } = this.state;
    const uniqSortListWords = uniqSortFilter(listWords, word);

    const newListWordsWithStar = finsStarredElements(
      uniqSortListWords,
      starredWords
    );

    return (
      <div className={classes.app}>
        <Header
          toggleKeeper={this.handleChangeOnKeeper}
          toggleStarred={this.handleChangeOnStarred}
        />
        <Switch>
          <Route exact path="/">
            <ListWordsContext.Provider value={newListWordsWithStar}>
              <SearchValueContext.Provider value={this.handleChangeSearchWord}>
                <HandleStarredWordContext.Provider
                  value={this.handleStarredWord}
                >
                  <Keeper />
                </HandleStarredWordContext.Provider>
              </SearchValueContext.Provider>
            </ListWordsContext.Provider>
          </Route>
          <Route path="/starred">
            <ListWordsContext.Provider value={starredWords}>
              <SearchValueContext.Provider value={this.handleChangeSearchWord}>
                <HandleStarredWordContext.Provider
                  value={this.handleStarredWord}
                >
                  <Keeper />
                </HandleStarredWordContext.Provider>
              </SearchValueContext.Provider>
            </ListWordsContext.Provider>
          </Route>
        </Switch>
      </div>
    );
  }
}

function finsStarredElements(targetArray, additionalArray) {
  return targetArray.map((itemKeep) => {
    const starKeep = additionalArray.find(
      (itemStar) => itemKeep.word === itemStar.word
    );

    if (starKeep) {
      return { ...starKeep, starred: true };
    }
    return itemKeep;
  });
}

function uniqSortFilter(array, filter) {
  return _.uniqWith(
    [...array]
      .sort((prev, next) => (prev.word < next.word ? -1 : 1))
      .filter((item) => item.word.includes(filter))
      .slice(-10),
    _.isEqual
  );
}
