namespace Events {
  class Event {
    handlers: Map<any, any>;
    count: number;
    constructor() {
      this.handlers = new Map();
      this.count = 0;
    }

    subscribe(handler: (...args: any) => void) {
      this.handlers.set(++this.count, handler);
      return this.count;
    }

    unsubscribe(idx: number) {
      this.handlers.delete(idx);
    }

    // 1) who fired the event?
    // 2) additional data (event args)
    fire(sender: Personh, ...args) {
      this.handlers.forEach((v, k) => v(sender, ...args));
    }
  }

  // class FallsIllArgs {
  //   constructor(public address) {}
  // }

  // class Personh {
  //   public fallsIll: Event;
  //   constructor(public address) {
  //     this.fallsIll = new Event();
  //   }

  //   catchCold() {
  //     this.fallsIll.fire(this, new FallsIllArgs(this.address));
  //   }
  // }

  // let person = new Personh('1234 London Road');
  // let sub = person.fallsIll.subscribe((s, a: FallsIllArgs) => {
  //   console.log(`A doctor has been called to ${a.address}`);
  // });

  // person.catchCold();
  // person.catchCold();
  // person.fallsIll.unsubscribe(sub);
  // person.catchCold();

  class PropertyChangedArgs {
    constructor(public name: string, public newValue: number | boolean) {}
  }

  class Personh {
    private _age: number;
    propertyChanged: Event;
    constructor(age: number) {
      this._age = age;
      this.propertyChanged = new Event();
    }

    get age() {
      return this._age;
    }

    set age(value: number) {
      if (!value || this._age === value) return;

      let oldCanVote = this.canVote;
      this._age = value;
      this.propertyChanged.fire(this, new PropertyChangedArgs('age', value));

      if (oldCanVote !== this.canVote) {
        this.propertyChanged.fire(this, new PropertyChangedArgs('canVote', this.canVote));
      }
    }

    get canVote() {
      return this._age >= 16;
    }
  }

  class VotinChecker {
    constructor(public person: Personh) {
      this.person.propertyChanged.subscribe(this.votingChanged.bind(this));
    }

    votingChanged(sender: Personh, args: PropertyChangedArgs) {
      if (sender === this.person && args.name === 'canVote') {
        console.log('Voting status changed to ' + args.newValue);
      }
    }
  }

  class RegistrationChecker {
    token: number;
    constructor(public person: Personh) {
      this.token = person.propertyChanged.subscribe(
        this.age_changed.bind(this) // if we don't put the bind method, the reference to [this]
        // is gonna be the reference of the class calling the function (this is Event),
        //  but with bind(this) we assure that this keeps its reference to RegistrationChecker
      );
    }

    age_changed(sender: Personh, args: PropertyChangedArgs) {
      if (sender === this.person && args.name === 'age') {
        if (Number(args.newValue) < 13) {
          console.log(`Sorry, you are still to young`);
        } else {
          console.log(`Okay, you can register`);
          sender.propertyChanged.unsubscribe(this.token);
        }
      }
    }
  }

  let personh = new Personh(10);
  // let checker = new RegistrationChecker(personh);
  let voting_checker = new VotinChecker(personh);
  for (let i = 10; i < 20; ++i) {
    console.log(`Changing age to ${i}`);
    personh.age = i;
  }
}
