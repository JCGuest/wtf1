class Search {
    constructor(searchQuery) {
        this.url = 'http://ergast.com/api/f1';
        this.query = searchQuery;
    }
    string() {
        return this.query;
    }
    search() {
        return this.url;
    }
}
module.exports = Search;
