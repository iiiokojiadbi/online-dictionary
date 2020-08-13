import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import classes from './App.module.css';
import './../../fonts/PTSans.css';
import DictionaryApi from './../../service/Api';
import Header from './../Header/Header';
import WordBoard from './../WordBoard/WordBoard';
import InfoPopup from './../InfoPopup/InfoPopup';

import { ListWordsContext } from './../../context/ListWordsContext';
import { SearchValueContext } from './../../context/SearchValueContext';
import { HandleStarredWordContext } from './../../context/HandleStarredWordContext';
import { HandleSetPathOfSpeechContext } from './../../context/HandleSetPathOfSpeechContext';
import { IsStarredContext } from './../../context/IsStarredContext';
import { HandleOpenInfoPopup } from './../../context/HandleOpenInfoPopup';

import Storage from './../../service/Storage';

import _ from 'lodash';

export default class App extends Component {
  _api = new DictionaryApi();
  _storage = new Storage();

  state = {
    listWords: [],
    starredWords: [],
    isStarred: false,
    filterPathOfSpeech: '',
    isInfoPopupOpen: false,
  };

  componentDidMount() {
    this._storage.initialRender();
    const { findWords, starredWords } = this._storage.getInitialData();
    this.setState({
      listWords: findWords,
      starredWords: starredWords,
      word: '',
      isStarred: window.location.pathname === '/starred',
      wordInfo: null,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.word !== '' &&
      this.state.word !== prevState.word &&
      this.state.isStarred === false
    ) {
      this.refreshListWords();
      this._storage.refreshStorage('findWords', this.state.listWords);
    }
    if (this.state.starredWords !== prevState.starredWords) {
      this._storage.refreshStorage('starredWords', this.state.starredWords);
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

  handleSetPathOfSpeech = ({ pathOfSpeech }) => {
    this.setState({
      filterPathOfSpeech: pathOfSpeech,
    });
  };

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

  handleClickWord = ({ word }) => {
    console.log(word);
    this.handleInfoPopupOpen();
    this.setState({
      wordInfo: word,
    });
  };

  handleInfoPopupOpen = () => {
    this.setState({
      isInfoPopupOpen: true,
    });
  };

  handleClosePopup = () => {
    this.setState({
      isInfoPopupOpen: false,
    });
  };

  render() {
    const {
      listWords,
      starredWords,
      word,
      isStarred,
      filterPathOfSpeech,
      isInfoPopupOpen,
      wordInfo,
    } = this.state;
    const uniqSortListWords = uniqSortFilter(listWords, word);

    const newListWordsWithStar = finsStarredElements(
      uniqSortListWords,
      starredWords
    );

    const filterStarredWord = isStarred
      ? filterStarredWords(starredWords, word)
      : starredWords;

    const filterPathOfSpeechStarredWord = filterWordsPathOfSpeech({
      items: filterStarredWord,
      filter: filterPathOfSpeech,
    });

    return (
      <div className={classes.app}>
        <Header
          toggleKeeper={this.handleChangeOnKeeper}
          toggleStarred={this.handleChangeOnStarred}
        />
        <Switch>
          <HandleOpenInfoPopup.Provider value={this.handleClickWord}>
            <IsStarredContext.Provider value={isStarred}>
              <SearchValueContext.Provider
                value={{
                  inputWord: word,
                  handleChangeSearch: this.handleChangeSearchWord,
                }}
              >
                <HandleStarredWordContext.Provider
                  value={this.handleStarredWord}
                >
                  <HandleSetPathOfSpeechContext.Provider
                    value={this.handleSetPathOfSpeech}
                  >
                    <Route exact path="/">
                      <ListWordsContext.Provider value={newListWordsWithStar}>
                        <WordBoard />
                      </ListWordsContext.Provider>
                    </Route>
                    <Route path="/starred">
                      <ListWordsContext.Provider
                        value={filterPathOfSpeechStarredWord}
                      >
                        <WordBoard />
                      </ListWordsContext.Provider>
                    </Route>
                  </HandleSetPathOfSpeechContext.Provider>
                </HandleStarredWordContext.Provider>
              </SearchValueContext.Provider>
            </IsStarredContext.Provider>
            <InfoPopup
              isOpen={isInfoPopupOpen}
              onClose={this.handleClosePopup}
              {...wordInfo}
            />
          </HandleOpenInfoPopup.Provider>
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

function filterStarredWords(array, filter) {
  return array.filter((item) => {
    if (filter === '') {
      return true;
    } else {
      return item.word.includes(filter);
    }
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

function filterWordsPathOfSpeech({ items, filter }) {
  const filterWords = items.filter((words) => {
    const infoWord = words.results !== undefined ? words.results['0'] : null;
    const { partOfSpeech } = infoWord || {
      partOfSpeech: 'missing',
    };
    switch (filter) {
      case 'noun':
        return partOfSpeech === filter;
      case 'verb':
        return partOfSpeech === filter;
      case 'adjective':
        return partOfSpeech === filter;
      default:
        return true;
    }
  });

  return filterWords;
}
