export default class DictionaryApi {
  _baseUrl = 'https://wordsapiv1.p.rapidapi.com/words';
  _baseHeaders = {
    'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
    'x-rapidapi-key': 'c83ecd7197msh753cd144a215978p1637dfjsnf0d0ef5beb95',
  };
  _limitWords = 'limit=10';
  _countPage = 'page=1';
  _pronunciationPattern = 'pronunciationpattern=.*æm$';

  _getBaseResource = async ({ url }) => {
    const response = await fetch(`${this._baseUrl}/${url}`, {
      method: 'GET',
      headers: this._baseHeaders,
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    const body = await response.json();
    return body;
  };

  getListWords = async ({ word }) => {
    const url = `?letterPattern=^${word}&${this._pronunciationPattern}&${this._limitWords}&${this._countPage}`;
    const listWords = this._transformListItem(
      await this._getBaseResource({ url })
    );
    return listWords;
  };

  getInfoWord = async (word) => {
    const response = await this._getBaseResource({ url: word });
    return response;
  };

  _transformListItem = (responseData) => responseData.results.data;
}
