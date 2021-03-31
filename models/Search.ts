class Search {
  public query: string;
  public url: string;

  constructor() {
    this.url = 'http://ergast.com/api/f1';
  }

  translate() {
    console.log(this.query);
  }

  callApi() {
    console.log(this.url);
  }
}
