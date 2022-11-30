// value Proxy
class Percentage {
  constructor(public percent: number) {}

  toString() {
    return `${this.percent}%`;
  }

  valueOf() {
    return this.percent / 100;
  }
}

let fivePercent = new Percentage(5);
console.log(`string value: `, fivePercent.toString());
console.log(`5% of 50 is ${50 * fivePercent.valueOf()}`);

// Property Proxy
class Property {
  private _value: any;
  name: string;
  constructor(value: any, name = '') {
    this._value = value;
    this.name = name;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    if (this._value === newValue) {
      return;
    }
    // special things inside the setter or the getter as well
    console.log(`Assigning ${newValue} to ${this.name}`);
    this._value = newValue;
  }
}

class Creature_ {
  private _agility: Property;
  constructor() {
    this._agility = new Property(10, 'agility');
  }

  get agility() {
    return this._agility.value;
  }

  set agility(value) {
    this._agility.value = value;
  }
}

let ca = new Creature_();
ca.agility = 12;
ca.agility = 13;

// proteccion proxy
class Car {
  drive() {
    console.log('Car is being driven');
  }
}

class CarProxy {
  private _car: Car;
  constructor(public driver: Driver) {
    this._car = new Car();
  }

  drive() {
    if (this.driver.age >= 16) {
      this._car.drive();
    } else {
      console.log('Driver too young');
    }
  }
}

class Driver {
  constructor(public age: number) {}
}

let car = new Car();
car.drive();

let car2 = new CarProxy(new Driver(120));
car2.drive();

// virtual proxy
class Image1 {
  constructor(public url: string) {
    console.log(`loagin image from ${url}`);
  }

  draw() {
    console.log(`Drawing image from ${this.url}`);
  }
}

class LazyImage {
  constructor(public url: string) {
    console.log(`loagin image from ${url}`);
  }

  draw() {
    console.log(`Drawing image from ${this.url}`);
  }
}

function drawImage(img: Image1) {
  console.log(`About to draw the image`);
  img.draw();
  console.log(`Done drawgin the image`);
}

let img = new Image1('http://pokemon.com/pikachu.png');
