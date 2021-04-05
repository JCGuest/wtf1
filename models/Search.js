const axios = require('axios');
class Search {
    constructor(searchQuery) {
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
            return (data.MRData.RaceTable.Races[0].Results[0].Driver.givenName +
                ' ' +
                data.MRData.RaceTable.Races[0].Results[0].Driver.familyName);
        })
            .catch((err) => console.error(err));
        return result;
    }
    createURL() {
        const urlFull = this.url + this.search();
        return urlFull;
    }
    async findRound() {
        const answer = await axios
            .get(`http://ergast.com/api/f1/${this.getYear(this.query)}.json`)
            .then((json) => {
            const data = json.data;
            return data.MRData.RaceTable.Races.find((race) => {
                // console.log(race.raceName);
                return (race.raceName.toString().toLowerCase() == 'japanese grand prix');
            });
        })
            .catch((err) => console.error(err));
        return answer.round;
    }
    getYear(query) {
        const array = query.split(' ');
        const year = array.find((word) => {
            const letters = word.split('');
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
