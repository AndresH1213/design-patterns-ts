namespace Prototype {
  class Address {
    constructor(public streetAddress: string, public city: string, public country: string) {}

    toString() {
      return `Address: ${this.streetAddress}, ${this.city}, ${this.country}`;
    }

    // deepCopy() {
    //   return new Address(this.streetAddress, this.city, this.country);
    // }
  }

  class Person_2 {
    constructor(public name: string, public address: Address) {}

    toString() {
      return `${this.name} lives at ${this.address}`;
    }

    greet() {
      console.log(`Hi, my name is ${this.name}, I live at ${this.address.toString()}`);
    }

    // deepCopy() {
    //   return new Person_2(this.name, this.address.deepCopy());
    // }
  }

  let John = new Person_2('John', new Address('123 London Road', 'London', 'UK'));

  // let Jane = John.deepCopy();

  // Jane.name = 'Jane';
  // Jane.address.streetAddress = '321 Angel st';
  // console.log(John);
  // console.log(Jane);
}
