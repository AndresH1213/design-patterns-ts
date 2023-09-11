class UserA {
  constructor(public fullName: string) {}
}

// here we don't have the fullname, we have a buch of integers. You have to map them onto.
// to have the actual strings using the space separator
class UserB {
  static strings: string[] = [];
  names: number[];

  constructor(public fullName: string) {
    let getOrAdd = function (s: string) {
      let idx = UserB.strings.indexOf(s);
      if (idx !== -1) return idx;
      else {
        UserB.strings.push(s);
        return UserB.strings.length - 1;
      }
    };

    this.names = fullName.split(' ').map(getOrAdd);
  }
}

function getRandomInt5(max: number) {
  return Math.floor(Math.random() * max);
}

let randomString = function () {
  let result: string[] = [];
  for (let x = 0; x < 10; ++x) {
    result.push(String.fromCharCode(65 + getRandomInt5(26)));
  }
  return result.join('');
};

let firstNames: string[] = [];
let lastNames: string[] = [];

let users: UserA[] = [];
let users2: UserB[] = [];

for (let i = 0; i < 100; ++i) {
  firstNames.push(randomString());
  lastNames.push(randomString());
}

for (let first of firstNames) {
  for (let last of lastNames) {
    users.push(new UserA(`${first} ${last}`));
    users2.push(new UserB(`${first} ${last}`));
  }
}

console.log('10k users take up approx ' + `${JSON.stringify(users).length} chars`);

let users2length = [users2, UserB.strings]
  .map((x) => JSON.stringify(x).length)
  .reduce((x, y) => x + y);

// result is going to be unnacure and different from javascript

console.log(`10k flyweight users take up approx ` + `${users2length} chars`);
