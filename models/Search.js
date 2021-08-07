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
        if (this.lastWeek) {
            return this.searchLastWeek();
        }
        else if (this.teamChamp) {
            return this.searchTeam();
        }
        else if (this.driverChamp) {
            return this.searchDriverChamp();
        }
        else {
            return this.searchPast();
        }
    }
    // in here i will switch the flags for lastWeek or call a switch for teamChamp, and driverChamp
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
        const teamWords = ['team', 'constructor']; // not used but maybe in future
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
    async searchPast() {
        let roundNumber = await this.findRound();
        if (roundNumber) {
            let result = await axios
                .get(`http://ergast.com/api/f1/${this.year}/${roundNumber}/results/${this.position}.json`)
                .then((json) => {
                const data = json.data;
                return (data.MRData.RaceTable.Races[0].Results[0].Driver.givenName +
                    ' ' +
                    data.MRData.RaceTable.Races[0].Results[0].Driver.familyName);
            })
                .catch((err) => console.error(err));
            return result;
        }
    }
    async findRound() {
        if (!this.champOrLastWeekQuery) {
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
    }
    getYear(query) {
        let array = query.split(' ');
        let year = array.find((word) => {
            let letters = word.split('');
            // the next line is a bit of a hack that excludes words like 19th or 22nd
            if (!letters.includes('t') && !letters.includes('d')) {
                if (letters[0] == '1') {
                    return word;
                }
                if (letters[0] == '2') {
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
        const gridTranslator = {
            won: 1,
            winner: 1,
            first: 1,
            '1st': 1,
            second: 2,
            '2nd': 2,
            third: 3,
            '3rd': 3,
            fourth: 4,
            '4th': 4,
            fifth: 5,
            '5th': 5,
            sixth: 6,
            '6th': 6,
            seventh: 7,
            '7th': 7,
            eighth: 8,
            '8th': 8,
            ninth: 9,
            '9th': 9,
            '10th': 10,
            tenth: 10,
            '11th': 11,
            eleventh: 11,
            '12th': 12,
            twelfth: 12,
            '13th': 13,
            thirteenth: 13,
            '14th': 14,
            fourteenth: 14,
            '15th': 15,
            fifteenth: 15,
            '16th': 16,
            sixteenth: 16,
            '17th': 17,
            seventeenth: 17,
            '18th': 18,
            eighteenth: 18,
            '19th': 19,
            nineteenth: 19,
            '20th': 20,
            twentyth: 20,
            '21st': 21,
            twentyfirst: 21,
            '22nd': 22,
            twentysecond: 22,
            '23rd': 23,
            twentythird: 23,
            '24th': 24,
            twentyfourth: 24
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
    async searchTeam() {
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
}
module.exports = Search;
