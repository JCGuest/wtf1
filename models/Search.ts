const axios = require('axios');

class Search {
  public query: string;
  public raceName: string;
  public year: string;
  public position: string;

  constructor(searchQuery: string) {
    this.query = searchQuery;
    this.raceName = this.getName(searchQuery);
    this.year = this.getYear(searchQuery);
    this.position = this.getPosition(searchQuery);
  }

  async search() {
    let roundNumber = await this.findRound();
    let result = await axios
      .get(
        `http://ergast.com/api/f1/${this.year}/${roundNumber}/results/${this.position}.json`
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

  getPosition(query) {
    let grid = [
      'winner',
      'won',
      'first',
      'second',
      'third',
      'fourth',
      'fifth',
      'sixth',
      'seventh',
      'eighth',
      'ninth',
      'tenth',
      '11th',
      '12th',
      '13th',
      '14th',
      '15th',
      '16th',
      '17th',
      '18th',
      '19th',
      '20th',
      '21st',
      '22nd',
      '23rd',
      '24th'
    ];
    const gridTranslator = {
      won: 1,
      winner: 1,
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
      fifth: 5,
      sixth: 6,
      seventh: 7,
      eighth: 8,
      ninth: 9,
      '10th': 10,
      '11th': 11,
      '12th': 12,
      '13th': 13,
      '14th': 14,
      '15th': 15,
      '16th': 16,
      '17th': 17,
      '18th': 18,
      '19th': 19,
      '20th': 20,
      '21st': 21,
      '22nd': 22,
      '23rd': 23,
      '24th': 24
    };
    const queryArray = query.split(' ');
    let position = '';

    while (!position) {
      for (let x = 0; x < grid.length; x++) {
        for (let i = 0; i < queryArray.length; i++) {
          grid[x] == queryArray[i].toLowerCase() ? (position = grid[x]) : -1;
        }
      }
    }
    return gridTranslator[position];
  }
}

// const Q = new Search('who won the 2009 Italian Grand Prix?');
// console.log(Q.query);
// console.log(Q.url);
// console.log(Q.raceName);
// console.log(Q.year);

module.exports = Search;
