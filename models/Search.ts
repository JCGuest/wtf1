const axios = require('axios');

class Search {
  public query: string;
  public url: string;

  constructor(searchQuery: string) {
    this.url = 'http://ergast.com/api/f1';
    this.query = searchQuery;
  }

  async string() {
    ('who won the 2005 Japanese Grand Prix');
    const result = await axios
      .get('http://ergast.com/api/f1/2005/18/results/1.json')
      .then((json) => {
        const data = json.data;
        console.log(
          data.MRData.RaceTable.Races[0].Results[0].Driver.givenName +
            ' ' +
            data.MRData.RaceTable.Races[0].Results[0].Driver.familyName
        );
        return (
          data.MRData.RaceTable.Races[0].Results[0].Driver.givenName +
          ' ' +
          data.MRData.RaceTable.Races[0].Results[0].Driver.familyName
        );
      })
      .catch((err) => console.error(err));

    return result;
  }

  search() {
    const urlFull: string = this.url + this.string();
    return urlFull;
  }
}

module.exports = Search;
///
