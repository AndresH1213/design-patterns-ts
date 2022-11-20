"use strict";
class Person_ {
    constructor() {
        //address
        this.streetAddress = '';
        this.postcode = '';
        this.city = '';
        // employment
        this.companyName = '';
        this.position = '';
        this.annualIncome = 0;
    }
    toString() {
        return (`Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}\n` +
            `and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`);
    }
}
class PersonBuilder {
    constructor(person = new Person_()) {
        this.person = person;
    }
    get lives() {
        return new PersonAddressBuilder(this.person);
    }
    get works() {
        return new PersonJobBuilder(this.person);
    }
    build() {
        return this.person;
    }
}
class PersonAddressBuilder extends PersonBuilder {
    constructor(person) {
        super(person);
        this.person = person;
    }
    at(streetAddress) {
        this.person.streetAddress = streetAddress;
        return this;
    }
    withPostCode(postCode) {
        this.person.postcode = postCode;
        return this;
    }
    in(city) {
        this.person.city = city;
        return this;
    }
}
class PersonJobBuilder extends PersonBuilder {
    constructor(person) {
        super(person);
        this.person = person;
    }
    at(companyName) {
        this.person.companyName = companyName;
        return this;
    }
    asA(position) {
        this.person.position = position;
        return this;
    }
    earning(annualIncome) {
        this.person.annualIncome = annualIncome;
        return this;
    }
}
const pb = new PersonBuilder();
let Juan = pb.lives
    .at('123 London Road')
    .in('London')
    .withPostCode('SW123')
    .works.at('Fabrikam')
    .asA('Engineer')
    .earning(123000)
    .build();
console.log(Juan.toString());
