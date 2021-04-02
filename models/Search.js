const axios = require('axios');
class Search {
    constructor(searchQuery) {
        this.url = 'http://ergast.com/api/f1';
        this.query = searchQuery;
    }
    string() {
        ('who won the 2005 Japanese Grand Prix');
        axios
            .get('http://ergast.com/api/f1/2005/18/results/1')
            .then((json) => {
            const data = json.data;
            var parser = new XMLSerializer();
            var str = parser.serializeToString(data);
            console.log(str);
        })
            .catch((err) => console.error(err));
        return 'http://ergast.com/api/f1/2005/18/results/1';
    }
    search() {
        const urlFull = this.url + this.string();
        return urlFull;
    }
}
module.exports = Search;
