export default class DictionaryApi {
  _baseUrl = 'https://wordsapiv1.p.rapidapi.com/words';
  _keyUser = '6278a23d-0650-4a90-a121-4779969b1347';
  _headers = {
    'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
    'x-rapidapi-key': 'c83ecd7197msh753cd144a215978p1637dfjsnf0d0ef5beb95',
  };
  _limitWords = 'limit=10';
  _countPage = 'page=1';
  _pronunciationPattern = 'pronunciationpattern=.*æm$';

  _getResource = async ({ url }) => {
    const response = await fetch(`${this._baseUrl}/${url}`, {
      method: 'GET',
      headers: this._headers,
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
    const body = await response.json();
    return body;
  };

  getListWords = async ({ word }) => {
    const url = `?letterPattern=^${word}&${this._pronunciationPattern}&${this._limitWords}&${this._countPage}`;
    const response = this._transformListItem(await this._getResource({ url }));
    return response;
  };

  getInfoWord = async ({ word }) => {
    const response = await this._getResource({ url: word });
    return response;
  };

  _transformListItem = (responseData) => responseData.results.data;
}
