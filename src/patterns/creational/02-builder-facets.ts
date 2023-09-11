namespace Builder {
  class Person {
    public streetAddress: string;
    public postcode: string;
    public city: string;
    public companyName: string;
    public position: string;
    public annualIncome: number;

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
      return (
        `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}\n` +
        `and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`
      );
    }
  }

  class PersonBuilder {
    public person: Person;
    constructor(person: Person = new Person()) {
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
    constructor(public person: Person) {
      super(person);
    }

    at(streetAddress: string) {
      this.person.streetAddress = streetAddress;
      return this;
    }

    withPostCode(postCode: string) {
      this.person.postcode = postCode;
      return this;
    }

    in(city: string) {
      this.person.city = city;
      return this;
    }
  }

  class PersonJobBuilder extends PersonBuilder {
    constructor(public person: Person) {
      super(person);
    }

    at(companyName: string) {
      this.person.companyName = companyName;
      return this;
    }

    asA(position: string) {
      this.person.position = position;
      return this;
    }

    earning(annualIncome: number) {
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
}
