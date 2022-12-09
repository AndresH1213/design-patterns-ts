class Address1 {
  constructor(
    public streetAddress: string,
    public city: string,
    public country: string
  ) {}

  toString() {
    return `Address: ${this.streetAddress}, ${this.city}, ${this.country}`;
  }
}

class Person3 {
  constructor(public name: string, public address: Address1) {}

  toString() {
    return `${this.name} lives at ${this.address}`;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name}, I live at ${this.address.toString()}`
    );
  }
}

class Serializer {
  constructor(public types: any[]) {}

  markRecursive(object: Object) {
    let idx = this.types.findIndex((t) => {
      return t.name === object.constructor.name;
    });
    if (idx !== -1) {
      object['typeIndex'] = idx;

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key]) {
          this.markRecursive(object[key]);
        }
      }
    }
  }

  reconstructRecursive(object: Object) {
    if (object.hasOwnProperty('typeIndex')) {
      let type = this.types[object['typeIndex']];
      let obj = new type();
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key]) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete obj['typeIndex'];
      return obj;
    }
    return object;
  }

  clone(object: Object) {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }
}

let john = new Person3('John', new Address1('123 London Road', 'London', 'UK'));
let s = new Serializer([Person3, Address1]);
let jane = s.clone(john);

// with this approach we can perform a prototype deep copy
// without de-serialization and serialization.
let Johnn = new Person3(
  'John',
  new Address1('123 London Road', 'London', 'UK')
);
const Jane = { ...Johnn };
// Jane.greet(); wont work

jane.name = 'Jane';
jane.address.streetAddress = '321 Angel St';

console.log(john);
console.log(jane);
// john.greet();
// jane.greet();
