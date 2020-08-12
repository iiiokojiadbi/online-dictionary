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
    if (!localStorage.mainTitle) {
      this.refreshStorage('findWords', []);
    }
    if (!localStorage.sections) {
      this.refreshStorage('starredWords', []);
    }
  }
}
