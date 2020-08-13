export default class Storage {
  refreshStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
  }

  getData(key) {
    return JSON.parse(localStorage[key]);
  }

  getInitialData() {
    const initialStorage = {
      findWords: this.getData('findWords'),
      starredWords: this.getData('starredWords'),
    };

    return initialStorage;
  }

  initialRender() {
    if (!localStorage.findWords) {
      this.refreshStorage('findWords', []);
    }
    if (!localStorage.starredWords) {
      this.refreshStorage('starredWords', []);
    }
  }
}
