const axios = require('axios');

class Search {
  public query: string;
  public raceName: string;
  public year: string;
  public position: string;
  public roundNumber: string;
  public lastWeek: boolean = false;
  public champOrLastWeekQuery: boolean = false;
  public teamChamp: boolean = false;
  public driverChamp: boolean = false;

  constructor(searchQuery: string) {
    this.query = searchQuery;
    this.raceName = this.getName(searchQuery);
    this.year = this.getYear(searchQuery);
    this.position = this.getPosition(searchQuery);
  }
  search() {
    console.log('search');
    if (this.lastWeek) {
      return this.searchLastWeek();
    } else if (this.teamChamp) {
      return this.searchTeamChamp();
    } else if (this.driverChamp) {
      return this.searchDriverChamp();
    } else if (this.year != null) {
      if (this.position != null) {
        return this.searchRacePosition();
      } else {
        console.log('raceresults');
        return this.searchRaceResults();
      }
    }
  }

  // here i will switch the flags for lastWeek or call a switch for teamChamp, and driverChamp
  async champOrLastWeekSearch(query: string) {
    const lastWeekWords: Array<string> = [
      'last',
      'previous',
      'week',
      'weeks',
      "week's",
      'recent'
    ];

    const array: Array<string> = query.split(' ');
    array.find((word) => {
      for (let i = 0; i < lastWeekWords.length; i++) {
        word.toLowerCase() == lastWeekWords[i] ? (this.lastWeek = true) : null;
      }
    });
    if (!this.lastWeek) {
      this.driverOrTeamSwitch(query);
    }
  }

  driverOrTeamSwitch(query: string) {
    const driverWords: Array<string> = ['driver', 'drivers', "driver's"];
    const teamWords: Array<string> = ['team', 'constructor']; // not used

    const array: Array<string> = query.split(' ');
    array.find((word) => {
      for (let i = 0; i < driverWords.length; i++) {
        word == driverWords[i] ? (this.driverChamp = true) : null;
      }
    });
    if (!this.driverChamp) {
      this.teamChamp = true;
    }
  }

  async searchRacePosition() {
    this.roundNumber = await this.findRound();
    let result: string = await axios
      .get(
        `http://ergast.com/api/f1/${this.year}/${this.roundNumber}/results/${this.position}.json`
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

  async findRound() {
    if (!this.champOrLastWeekQuery) {
      let answer: string = await axios
        .get(`http://ergast.com/api/f1/${this.year}.json`)
        .then((json) => {
          let round: string = '';
          json.data.MRData.RaceTable.Races.forEach((race) => {
            if (race.raceName.toString().toLowerCase() == this.raceName) {
              round = race.round;
            }
          });
          return round;
        })
        .catch((err) => console.error(err));
      return answer;
    }
  }

  getYear(query: string) {
    let array: Array<string> = query.split(' ');
    let year: string = '';
    year = array.find((word) => {
      let letters = word.split('');
      // the next line is a bit of a hack that excludes words like 19th or 22nd
      if (!letters.includes('t') && !letters.includes('d')) {
        if (letters[0] == '1' || letters[0] == '2') {
          return word;
        }
      }
    });
    return year;
  }

  getName(query: string) {
    const gpNames: Array<string> = [
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
    const champOrLastWeekNames: Array<string> = [
      'week',
      'previous',
      'weeks',
      "weeks's",
      'season',
      'championship',
      'cup',
      'constructor',
      'recent'
    ];
    const queryArray: Array<string> = query.split(' ');
    let name: string = '';
    // the next block switches the champorlastweek boolean and then
    // prevents the while loop from running
    champOrLastWeekNames.find((word) => {
      for (let i = 0; i < queryArray.length; i++) {
        if (queryArray[i].toLowerCase() == word) {
          name = 'last week or championship search';
          this.champOrLastWeekQuery = true; // use this flag to turn off findRound()
          this.champOrLastWeekSearch(query); // this function switches between lastweek, team champ, and driver champ searches
        }
      }
    });
    while (!name) {
      for (let x = 0; x < gpNames.length; x++) {
        for (let i = 0; i < queryArray.length; i++) {
          gpNames[x] == queryArray[i].toLowerCase() ? (name = gpNames[x]) : -1;
        }
      }
    }
    let fullName: string = name.toLowerCase() + ' grand prix';
    return fullName;
  }

  getPosition(query) {
    let grid: Array<string> = [
      'winner',
      '1st',
      'won',
      'first',
      'second',
      '2nd',
      'third',
      '3rd',
      'fourth',
      '4th',
      'fifth',
      '5th',
      'sixth',
      '6th',
      'seventh',
      '7th',
      'eighth',
      '8th',
      'ninth',
      '9th',
      '10th',
      'tenth',
      '11th',
      'eleventh',
      '12th',
      'twelfth',
      '13th',
      'thirteenth',
      '14th',
      'fourteenth',
      '15th',
      'fifteenth',
      '16th',
      'sixteenth',
      '17th',
      'seventeenth',
      '18th',
      'eighteenth',
      '19th',
      'nineteenth',
      '20th',
      'twentieth',
      '21st',
      'twentyfirst',
      '22nd',
      'twentysecond',
      '23rd',
      'twentythird',
      '24th',
      'twentyfourth'
    ];
    enum gridTranslator  {
      won = 1,
      winner = 1,
      first= 1,
      '1st'= 1,
      secon = 2,
      '2nd'= 2,
      third= 3,
      '3rd'= 3,
      fourth = 4,
      '4th' = 4,
      fifth = 5,
      '5th' = 5,
      sixth = 6,
      '6th' = 6,
      seventh = 7,
      '7th' = 7,
      eighth = 8,
      '8th' = 8,
      ninth = 9,
      '9th' = 9,
      '10th' = 10,
      tenth = 10,
      '11th' = 11,
      eleventh = 11,
      '12th' = 12,
      twelfth = 12,
      '13th' = 13,
      thirteenth = 13,
      '14th' = 14,
      fourteenth = 14,
      '15th' = 15,
      fifteenth = 15,
      '16th' = 16,
      sixteenth = 16,
      '17th' = 17,
      seventeenth = 17,
      '18th' = 18,
      eighteenth = 18,
      '19th' = 19,
      nineteenth = 19,
      '20th'=  20,
      twentyth = 20,
      '21st' = 21,
      twentyfirst = 21,
      '22nd' =  22,
      twentysecond = 22,
      '23rd' = 23,
      twentythird = 23,
      '24th'= 24,
      twentyfourth = 24
    };
    const queryArray: Array<string> = query.split(' ');
    let position: string = null;
    let result: string = null;

    while (!position) {
      grid.find((word) => {
        for (let i = 0; i < queryArray.length; i++) {
          word == queryArray[i].toLowerCase() ? (position = word) : -1;
        }
      });
    }
    if (position != null) {
      result = gridTranslator[position];
    }
    return result;
  }

  async searchLastWeek() {
    let result: string = await axios
      .get(
        `http://ergast.com/api/f1/current/last/results/${this.position}.json`
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

  async searchTeamChamp() {
    let result: string = await axios
      .get(
        `http://ergast.com/api/f1/${this.year}/constructorStandings/${this.position}.json`
      )
      .then((json) => {
        const data = json.data;
        return data.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings[0].Constructor.name;
      })
      .catch((err) => console.error(err));

    return result;
  }

  async searchDriverChamp() {
    let result: string = await axios
      .get(
        `http://ergast.com/api/f1/${this.year}/driverStandings/${this.position}.json`
      )
      .then((json) => {
        const data = json.data;
        return (
          data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver
            .givenName +
          ' ' +
          data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver
            .familyName
        );
      })
      .catch((err) => console.error(err));
    return result;
  }

  async searchRaceResults() {
    let result = await axios
      .get(
        `http://ergast.com/api/f1/${this.year}/${this.roundNumber}/results.json`
      )
      .then((json) => {
        const data = json.data;
        console.log(`${this.year} / ${this.roundNumber}`);
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Search;
