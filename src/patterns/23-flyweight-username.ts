class User6 {
  constructor(public fullName: string) {}
}

// here we don't have the fullname, we have a buch of integers. You have to map them onto.
// to have the actual strings using the space separator
class User7 {
  static strings: string[] = [];
  names: number[];

  constructor(public fullName: string) {
    let getOrAdd = function (s: string) {
      let idx = User7.strings.indexOf(s);
      if (idx !== -1) return idx;
      else {
        User7.strings.push(s);
        return User7.strings.length - 1;
      }
    };

    this.names = fullName.split(' ').map(getOrAdd);
  }
}

function getRandomInt5(max: number) {
  return Math.floor(Math.random() * max);
}

let randomString4 = function () {
  let result: string[] = [];
  for (let x = 0; x < 10; ++x) {
    result.push(String.fromCharCode(65 + getRandomInt5(26)));
  }
  return result.join('');
};

let firstNames: string[] = [];
let lastNames: string[] = [];

let users: User6[] = [];
let users2: User7[] = [];

for (let i = 0; i < 100; ++i) {
  firstNames.push(randomString4());
  lastNames.push(randomString4());
}

for (let first of firstNames) {
  for (let last of lastNames) {
    users.push(new User6(`${first} ${last}`));
    users2.push(new User7(`${first} ${last}`));
  }
}

console.log(
  '10k users take up approx ' + `${JSON.stringify(users).length} chars`
);

let users2length = [users2, User7.strings]
  .map((x) => JSON.stringify(x).length)
  .reduce((x, y) => x + y);

// result is going to be unnacure and different from javascript

console.log(`10k flyweight users take up approx ` + `${users2length} chars`);
