const axios = require('axios');
class Search {
    constructor(searchQuery) {
        this.url = 'http://ergast.com/api/f1';
        this.query = searchQuery;
    }
    async string() {
        ('who won the 2005 Japanese Grand Prix');
        const result = await axios
            .get('http://ergast.com/api/f1/2005/18/results/1.json')
            .then((json) => {
            const data = json.data;
            return data;
            // console.log(data.MRData.RaceTable['Races']['Results']);
        })
            .catch((err) => console.error(err));
        console.log(result);
        // return 'http://ergast.com/api/f1/2005/18/results/1';
    }
    search() {
        const urlFull = this.url + this.string();
        return urlFull;
    }
}
module.exports = Search;
///
