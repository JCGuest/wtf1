const axios = require('axios');

class Search {
  public query: string;
  public url: string;
  public raceName: string;
  public year: string;

  constructor(searchQuery: string) {
    this.url = 'http://ergast.com/api/f1';
    this.query = searchQuery;
    this.raceName = this.getName(searchQuery);
    this.year = this.getYear(searchQuery);
  }

  async search() {
    let roundNumber = await this.findRound();
    let result = await axios
      .get(
        `http://ergast.com/api/f1/${this.year}/${roundNumber}/results/1.json`
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
      .get(`http://ergast.com/api/f1/${this.year}.json`)
      .then((json) => {
        let data = json.data;
        return data.MRData.RaceTable.Races.find((race) => {
          return race.raceName.toString().toLowerCase() == this.raceName;
        });
      })
      .catch((err) => console.error(err));

    return answer.round;
  }

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

  getName(query: string) {
    let gpNames = [
      'australian',
      'australia',
      'bahrain',
      'bahraini',
      'china',
      'chinese',
      'azerbaijan',
      'azeri',
      'spain',
      'spanish',
      'monaco',
      'monte carlo',
      'canada',
      'canadian',
      'france',
      'french',
      'austria',
      'austrian',
      'great britain',
      'british',
      'germany',
      'german',
      'hungary',
      'hungarian',
      'belgium',
      'belgian',
      'italy',
      'italian',
      'singapore',
      'russia',
      'russian',
      'japan',
      'japanese',
      'mexico',
      'mexican',
      'united states',
      'america',
      'american',
      'brazil',
      'brazilian',
      'abu dhabi',
      'malaysian',
      'malaysia',
      'dutch',
      'european',
      'portugal',
      'portuguese',
      'saudi arabia',
      'saudi',
      'saudi arabian'
    ];
    const queryArray = query.split(' ');
    let name = '';

    while (!name) {
      for (let x = 0; x < gpNames.length; x++) {
        for (let i = 0; i < queryArray.length; i++) {
          gpNames[x] == queryArray[i].toLowerCase() ? (name = gpNames[x]) : -1;
        }
      }
    }
    let fullName = name.toLowerCase() + ' grand prix';
    return fullName;
  }
}

const Q = new Search('who won the 2009 Italian Grand Prix?');
console.log(Q.query);
console.log(Q.url);
console.log(Q.raceName);
console.log(Q.year);

module.exports = Search;
