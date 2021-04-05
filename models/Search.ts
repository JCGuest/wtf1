const axios = require('axios');

class Search {
  public query: string;
  public url: string;

  constructor(searchQuery: string) {
    this.url = 'http://ergast.com/api/f1';
    this.query = searchQuery;
  }

  async search() {
    ('who won the 2005 Japanese Grand Prix');
    const result = await axios
      .get('http://ergast.com/api/f1/2005/18/results/1.json')
      .then((json) => {
        const data = json.data;
        // console.log(
        //   data.MRData.RaceTable.Races[0].Results[0].Driver.givenName +
        //     ' ' +
        //     data.MRData.RaceTable.Races[0].Results[0].Driver.familyName
        // );
        return (
          data.MRData.RaceTable.Races[0].Results[0].Driver.givenName +
          ' ' +
          data.MRData.RaceTable.Races[0].Results[0].Driver.familyName
        );
      })
      .catch((err) => console.error(err));

    return result;
  }

  createURL() {
    const urlFull: string = this.url + this.search();
    return urlFull;
  }

  async findRound() {
    const answer = await axios
      .get('http://ergast.com/api/f1/2005.json')
      .then((json) => {
        const data = json.data;
        return data.MRData.RaceTable.Races.find((race) => {
          // console.log(race.raceName);
          return (
            race.raceName.toString().toLowerCase() == 'japanese grand prix'
          );
        });
      })
      .catch((err) => console.error(err));

    return answer;
  }
}

module.exports = Search;
///
