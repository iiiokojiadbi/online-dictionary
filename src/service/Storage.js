export default class Storage {
  refreshStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
  }

  getData(key) {
    return JSON.parse(localStorage[key]);
  }

  getInitialData() {
    const initialStorage = {
      starredWords: this.getData('starredWords'),
    };

    return initialStorage;
  }

  initialRender() {
    if (!localStorage.starredWords) {
      this.refreshStorage('starredWords', []);
    }
  }
}
