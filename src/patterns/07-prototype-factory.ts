// if we want to have a couple of predefined objects and a very nice
// interface on top of that takes this objects customizes them and gives
// you nice api, set of methods for actually making those copies, instead
// no have to use the serializer explicitly

class Address {
  constructor(
    public suite: number | null,
    public streetAddress: string,
    public city: string
  ) {}

  toString() {
    return `Suite ${this.suite}, ` + `${this.streetAddress}, ${this.city}`;
  }
}

class Employee {
  // renamed
  constructor(public name: string | null, public address: Address) {}

  toString() {
    return `${this.name} works at ${this.address}`;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name}, ` + `I work at ${this.address.toString()}` //!
    );
  }
}

class Serializer {
  constructor(public types: any[]) {}

  markRecursive(object: Object) {
    // anoint each object with a type index
    let idx = this.types.findIndex((t) => {
      return t.name === object.constructor.name;
    });
    if (idx !== -1) {
      object['typeIndex'] = idx;

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null)
          this.markRecursive(object[key]); // ^^^^^^^^^^ important
      }
    }
  }

  reconstructRecursive(object: Object) {
    if (object.hasOwnProperty('typeIndex')) {
      let type = this.types[object['typeIndex']];
      let obj = new type();
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
          obj[key] = this.reconstructRecursive(object[key]);
        }
      }
      delete obj.typeIndex;
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

class EmployeeFactory {
  static serializer?: Serializer;
  static main: any;
  static aux: any;
  static _newEmployee(proto: Object, name: string, suite: number) {
    let copy = EmployeeFactory.serializer!.clone(proto);
    copy.name = name;
    copy.address.suite = suite;
    return copy;
  }

  static newMainOfficeEmployee(name: string, suite: number) {
    return this._newEmployee(EmployeeFactory.main, name, suite);
  }

  static newAuxOfficeEmployee(name: string, suite: number) {
    return this._newEmployee(EmployeeFactory.aux, name, suite);
  }
}

EmployeeFactory.serializer = new Serializer([Employee, Address]);

EmployeeFactory.main = new Employee(
  null,
  new Address(null, '123 East Dr', 'London')
);
EmployeeFactory.aux = new Employee(
  null,
  new Address(null, '200 London Road', 'Oxford')
);

let john = EmployeeFactory.newMainOfficeEmployee('John', 4321);
let jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 222);

console.log(john.toString());
console.log(jane.toString());
