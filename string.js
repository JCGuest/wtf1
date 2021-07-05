let string = 'who won the 2005 italian grand prix';

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

function getName4(s) {
  let gpNames = [
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
  const queryArray = s.split(' ');
  let name = '';

  while (!name) {
    for (let x = 0; x < gpNames.length; x++) {
      for (let i = 0; i < queryArray.length; i++) {
        gpNames[x] == queryArray[i] ? (name = gpNames[x]) : -1;
      }
    }
  }
  return name;
}

console.log(getName4(string));
