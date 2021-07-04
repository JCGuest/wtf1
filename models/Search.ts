const axios = require('axios');

class Search {
  public query: string;
  public url: string;
  public raceName: string;

  constructor(searchQuery: string) {
    this.url = 'http://ergast.com/api/f1';
    this.query = searchQuery;
  }

  async search() {
    let roundNumber = await this.findRound();
    let result = await axios
      .get(
        `http://ergast.com/api/f1/${this.getYear(
          this.query
        )}/${roundNumber}/results/1.json`
      )
      .then((json) => {
        const data = json.data;
        return (
          data.MRData.RaceTable.Races[0].Results[0].Driver.givenName +
          ' ' +
          data.MRData.RaceTable.Races[0].Results[0].Driver.familyName
        );
      })
      .catch((err) => console.error(err));

    return result;
  }

  // createURL() {
  //   const urlFull: string = this.url + this.search();
  //   return urlFull;
  // }

  async findRound() {
    let answer = await axios
      .get(`http://ergast.com/api/f1/${this.getYear(this.query)}.json`)
      .then((json) => {
        let data = json.data;
        return data.MRData.RaceTable.Races.find((race) => {
          return (
            race.raceName.toString().toLowerCase() == this.raceName
          );
        });
      })
      .catch((err) => console.error(err));

    return answer.round;
  };

  getYear(query: string) {
    let array = query.split(' ');
    let year = array.find((word) => {
      let letters = word.split('');
      if (letters[0] == '1') {
        return word;
      }
      if (letters[0] == '2') {
        return word;
      }
    });
    return year;
  }
}

module.exports = Search;
