let string = 'who won the 2005 Japanese grand prix';

function getYear(s) {
  const array = s.split(' ');
  const year = array.find((word) => {
    const letters = word.split('');
    if (letters[0] == '1') {
      return word;
    }
    if (letters[0] == '2') {
      return word;
    }
  });
  console.log(year);
}

getYear(string);
