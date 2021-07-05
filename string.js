let string = 'who was 12th place at the 2005 italian grand prix';

// // function getYear(s) {
// //   const array = s.split(' ');
// //   const year = array.find((word) => {
// //     const letters = word.split('');
// //     if (letters[0] == '1') {
// //       return word;
// //     }
// //     if (letters[0] == '2') {
// //       return word;
// //     }
// //   });
// //   console.log(year);
// // }

// // getYear(string);

// function getName(s) {
//   let allNames = [
//     'australian',
//     'australia',
//     'bahrain',
//     'bahraini',
//     'china',
//     'chinese',
//     'azerbaijan',
//     'azeri',
//     'spain',
//     'spanish',
//     'monaco',
//     'monte carlo',
//     'canada',
//     'canadian',
//     'france',
//     'french',
//     'austria',
//     'austrian',
//     'great britain',
//     'british',
//     'germany',
//     'german',
//     'hungary',
//     'hungarian',
//     'belgium',
//     'belgian',
//     'italy',
//     'italian',
//     'singapore',
//     'russia',
//     'russian',
//     'japan',
//     'japanese',
//     'mexico',
//     'mexican',
//     'united states',
//     'america',
//     'american',
//     'brazil',
//     'brazilian',
//     'abu dhabi',
//     'malaysian',
//     'malaysia',
//     'dutch',
//     'european',
//     'portugal',
//     'portuguese',
//     'saudi arabia',
//     'saudi',
//     'saudi arabian'
//   ];
//   const queryArray = s.split(' ');

//   const name = queryArray.forEach((word) => {
//     for (let i = 0; i < allNames.length - 1; i++) {
//       // console.log(allNames[i]);
//       if (allNames[i] == word.toLowercase) {
//         name = word.toLowercase;
//       }
//     } // for loop
//   }); // iterator
//   return name;
// } //function

// function getName2(s) {
//   let gpNames = [
//     'australian',
//     'australia',
//     'bahrain',
//     'bahraini',
//     'china',
//     'chinese',
//     'azerbaijan',
//     'azeri',
//     'spain',
//     'spanish',
//     'monaco',
//     'monte carlo',
//     'canada',
//     'canadian',
//     'france',
//     'french',
//     'austria',
//     'austrian',
//     'great britain',
//     'british',
//     'germany',
//     'german',
//     'hungary',
//     'hungarian',
//     'belgium',
//     'belgian',
//     'italy',
//     'italian',
//     'singapore',
//     'russia',
//     'russian',
//     'japan',
//     'japanese',
//     'mexico',
//     'mexican',
//     'united states',
//     'america',
//     'american',
//     'brazil',
//     'brazilian',
//     'abu dhabi',
//     'malaysian',
//     'malaysia',
//     'dutch',
//     'european',
//     'portugal',
//     'portuguese',
//     'saudi arabia',
//     'saudi',
//     'saudi arabian'
//   ];
//   const queryArray = s.split(' ');
//   let name = '';

//   for (let i = 0; i < queryArray.length; i++) {
//     name = gpNames.find((gp) => {
//       return gp == queryArray[i];
//     });
//   }
// }

// function getName3(s) {
//   let gpNames = [
//     'australian',
//     'australia',
//     'bahrain',
//     'bahraini',
//     'china',
//     'chinese',
//     'azerbaijan',
//     'azeri',
//     'spain',
//     'spanish',
//     'monaco',
//     'monte carlo',
//     'canada',
//     'canadian',
//     'france',
//     'french',
//     'austria',
//     'austrian',
//     'great britain',
//     'british',
//     'germany',
//     'german',
//     'hungary',
//     'hungarian',
//     'belgium',
//     'belgian',
//     'italy',
//     'italian',
//     'singapore',
//     'russia',
//     'russian',
//     'japan',
//     'japanese',
//     'mexico',
//     'mexican',
//     'united states',
//     'america',
//     'american',
//     'brazil',
//     'brazilian',
//     'abu dhabi',
//     'malaysian',
//     'malaysia',
//     'dutch',
//     'european',
//     'portugal',
//     'portuguese',
//     'saudi arabia',
//     'saudi',
//     'saudi arabian'
//   ];
//   const queryArray = s.split(' ');
//   let name = 'asdf';

//   name = gpNames.find((name) => {
//     for (let i = 0; i < queryArray.length; i++) {
//       name == queryArray[i];
//     }
//   });
//   return name;
// }

// function getName4(s) {
//   let gpNames = [
//     'australian',
//     'australia',
//     'bahrain',
//     'bahraini',
//     'china',
//     'chinese',
//     'azerbaijan',
//     'azeri',
//     'spain',
//     'spanish',
//     'monaco',
//     'monte carlo',
//     'canada',
//     'canadian',
//     'france',
//     'french',
//     'austria',
//     'austrian',
//     'great britain',
//     'british',
//     'germany',
//     'german',
//     'hungary',
//     'hungarian',
//     'belgium',
//     'belgian',
//     'italy',
//     'italian',
//     'singapore',
//     'russia',
//     'russian',
//     'japan',
//     'japanese',
//     'mexico',
//     'mexican',
//     'united states',
//     'america',
//     'american',
//     'brazil',
//     'brazilian',
//     'abu dhabi',
//     'malaysian',
//     'malaysia',
//     'dutch',
//     'european',
//     'portugal',
//     'portuguese',
//     'saudi arabia',
//     'saudi',
//     'saudi arabian'
//   ];
//   const queryArray = s.split(' ');
//   let name = '';

//   while (!name) {
//     for (let x = 0; x < gpNames.length; x++) {
//       for (let i = 0; i < queryArray.length; i++) {
//         gpNames[x] == queryArray[i] ? (name = gpNames[x]) : -1;
//       }
//     }
//   }
//   return name;
// }

function getPosition(query) {
  let grid = [
    'winner',
    'won',
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'eighth',
    'ninth',
    'tenth',
    '11th',
    '12th',
    '13th',
    '14th',
    '15th',
    '16th',
    '17th',
    '18th',
    '19th',
    '20th',
    '21st',
    '22nd',
    '23rd',
    '24th'
  ];
  const gridTranslator = {
    won: 1,
    winner: 1,
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    sixth: 6,
    seventh: 7,
    eighth: 8,
    ninth: 9,
    '10th': 10,
    '11th': 11,
    '12th': 12,
    '13th': 13,
    '14th': 14,
    '15th': 15,
    '16th': 16,
    '17th': 17,
    '18th': 18,
    '19th': 19,
    '20th': 20,
    '21st': 21,
    '22nd': 22,
    '23rd': 23,
    '24th': 24
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

console.log(getPosition(string));
