class Search {
    constructor() {
        this.url = 'http://ergast.com/api/f1';
    }
    getString() {
        console.log(this.query);
    }
    search() {
        console.log(this.url);
    }
}
const search = new Search();
search.query = 'this is the query';
search.getString();
search.search();
