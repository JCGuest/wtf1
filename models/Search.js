const axios = require('axios');
class Search {
    constructor(searchQuery) {
        this.lastWeek = false;
        this.champOrLastWeekQuery = false;
        this.teamChamp = false;
        this.driverChamp = false;
        this.query = searchQuery;
        this.raceName = this.getName(searchQuery);
        this.year = this.getYear(searchQuery);
        this.position = this.getPosition(searchQuery);
    }
    search() {
        console.log('search');
        if (this.lastWeek) {
            return this.searchLastWeek();
        }
        else if (this.teamChamp) {
            return this.searchTeamChamp();
        }
        else if (this.driverChamp) {
            return this.searchDriverChamp();
        }
        else if (this.year != null) {
            if (this.position != null) {
                return this.searchRacePosition();
            }
            else {
                console.log('raceresults');
                return this.searchRaceResults();
            }
        }
    }
    // here i will switch the flags for lastWeek or call a switch for teamChamp, and driverChamp
    async champOrLastWeekSearch(query) {
        const lastWeekWords = [
            'last',
            'previous',
            'week',
            'weeks',
            "week's",
            'recent'
        ];
        const array = query.split(' ');
        array.find((word) => {
            for (let i = 0; i < lastWeekWords.length; i++) {
                word.toLowerCase() == lastWeekWords[i] ? (this.lastWeek = true) : null;
            }
        });
        if (!this.lastWeek) {
            this.driverOrTeamSwitch(query);
        }
    }
    driverOrTeamSwitch(query) {
        const driverWords = ['driver', 'drivers', "driver's"];
        const teamWords = ['team', 'constructor']; // not used
        const array = query.split(' ');
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
        let result = await axios
            .get(`http://ergast.com/api/f1/${this.year}/${this.roundNumber}/results/${this.position}.json`)
            .then((json) => {
            const data = json.data;
            return (data.MRData.RaceTable.Races[0].Results[0].Driver.givenName +
                ' ' +
                data.MRData.RaceTable.Races[0].Results[0].Driver.familyName);
        })
            .catch((err) => console.error(err));
        return result;
    }
    async findRound() {
        if (!this.champOrLastWeekQuery) {
            let answer = await axios
                .get(`http://ergast.com/api/f1/${this.year}.json`)
                .then((json) => {
                let round = '';
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
    getYear(query) {
        let array = query.split(' ');
        let year = '';
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
    getName(query) {
        const gpNames = [
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
        const champOrLastWeekNames = [
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
        const queryArray = query.split(' ');
        let name = '';
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
        let fullName = name.toLowerCase() + ' grand prix';
        return fullName;
    }
    getPosition(query) {
        let grid = [
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
        let gridTranslator;
        (function (gridTranslator) {
            gridTranslator[gridTranslator["won"] = 1] = "won";
            gridTranslator[gridTranslator["winner"] = 1] = "winner";
            gridTranslator[gridTranslator["first"] = 1] = "first";
            gridTranslator[gridTranslator["1st"] = 1] = "1st";
            gridTranslator[gridTranslator["secon"] = 2] = "secon";
            gridTranslator[gridTranslator["2nd"] = 2] = "2nd";
            gridTranslator[gridTranslator["third"] = 3] = "third";
            gridTranslator[gridTranslator["3rd"] = 3] = "3rd";
            gridTranslator[gridTranslator["fourth"] = 4] = "fourth";
            gridTranslator[gridTranslator["4th"] = 4] = "4th";
            gridTranslator[gridTranslator["fifth"] = 5] = "fifth";
            gridTranslator[gridTranslator["5th"] = 5] = "5th";
            gridTranslator[gridTranslator["sixth"] = 6] = "sixth";
            gridTranslator[gridTranslator["6th"] = 6] = "6th";
            gridTranslator[gridTranslator["seventh"] = 7] = "seventh";
            gridTranslator[gridTranslator["7th"] = 7] = "7th";
            gridTranslator[gridTranslator["eighth"] = 8] = "eighth";
            gridTranslator[gridTranslator["8th"] = 8] = "8th";
            gridTranslator[gridTranslator["ninth"] = 9] = "ninth";
            gridTranslator[gridTranslator["9th"] = 9] = "9th";
            gridTranslator[gridTranslator["10th"] = 10] = "10th";
            gridTranslator[gridTranslator["tenth"] = 10] = "tenth";
            gridTranslator[gridTranslator["11th"] = 11] = "11th";
            gridTranslator[gridTranslator["eleventh"] = 11] = "eleventh";
            gridTranslator[gridTranslator["12th"] = 12] = "12th";
            gridTranslator[gridTranslator["twelfth"] = 12] = "twelfth";
            gridTranslator[gridTranslator["13th"] = 13] = "13th";
            gridTranslator[gridTranslator["thirteenth"] = 13] = "thirteenth";
            gridTranslator[gridTranslator["14th"] = 14] = "14th";
            gridTranslator[gridTranslator["fourteenth"] = 14] = "fourteenth";
            gridTranslator[gridTranslator["15th"] = 15] = "15th";
            gridTranslator[gridTranslator["fifteenth"] = 15] = "fifteenth";
            gridTranslator[gridTranslator["16th"] = 16] = "16th";
            gridTranslator[gridTranslator["sixteenth"] = 16] = "sixteenth";
            gridTranslator[gridTranslator["17th"] = 17] = "17th";
            gridTranslator[gridTranslator["seventeenth"] = 17] = "seventeenth";
            gridTranslator[gridTranslator["18th"] = 18] = "18th";
            gridTranslator[gridTranslator["eighteenth"] = 18] = "eighteenth";
            gridTranslator[gridTranslator["19th"] = 19] = "19th";
            gridTranslator[gridTranslator["nineteenth"] = 19] = "nineteenth";
            gridTranslator[gridTranslator["20th"] = 20] = "20th";
            gridTranslator[gridTranslator["twentyth"] = 20] = "twentyth";
            gridTranslator[gridTranslator["21st"] = 21] = "21st";
            gridTranslator[gridTranslator["twentyfirst"] = 21] = "twentyfirst";
            gridTranslator[gridTranslator["22nd"] = 22] = "22nd";
            gridTranslator[gridTranslator["twentysecond"] = 22] = "twentysecond";
            gridTranslator[gridTranslator["23rd"] = 23] = "23rd";
            gridTranslator[gridTranslator["twentythird"] = 23] = "twentythird";
            gridTranslator[gridTranslator["24th"] = 24] = "24th";
            gridTranslator[gridTranslator["twentyfourth"] = 24] = "twentyfourth";
        })(gridTranslator || (gridTranslator = {}));
        ;
        const queryArray = query.split(' ');
        let position = null;
        let result = null;
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
        let result = await axios
            .get(`http://ergast.com/api/f1/current/last/results/${this.position}.json`)
            .then((json) => {
            const data = json.data;
            return (data.MRData.RaceTable.Races[0].Results[0].Driver.givenName +
                ' ' +
                data.MRData.RaceTable.Races[0].Results[0].Driver.familyName);
        })
            .catch((err) => console.error(err));
        return result;
    }
    async searchTeamChamp() {
        let result = await axios
            .get(`http://ergast.com/api/f1/${this.year}/constructorStandings/${this.position}.json`)
            .then((json) => {
            const data = json.data;
            return data.MRData.StandingsTable.StandingsLists[0]
                .ConstructorStandings[0].Constructor.name;
        })
            .catch((err) => console.error(err));
        return result;
    }
    async searchDriverChamp() {
        let result = await axios
            .get(`http://ergast.com/api/f1/${this.year}/driverStandings/${this.position}.json`)
            .then((json) => {
            const data = json.data;
            return (data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver
                .givenName +
                ' ' +
                data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver
                    .familyName);
        })
            .catch((err) => console.error(err));
        return result;
    }
    async searchRaceResults() {
        let result = await axios
            .get(`http://ergast.com/api/f1/${this.year}/${this.roundNumber}/results.json`)
            .then((json) => {
            const data = json.data;
            console.log(`${this.year} / ${this.roundNumber}`);
        })
            .catch((err) => console.log(err));
    }
}
module.exports = Search;
