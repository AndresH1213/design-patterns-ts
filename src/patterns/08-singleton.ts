interface SingletonConstructor extends Function {
  instance?: any;
}

class Singleton {
  i = 1;
  constructor() {
    let constructor: SingletonConstructor = this.constructor;
    const instance = constructor.instance;
    if (instance) {
      return instance;
    }
    constructor.instance = this;
  }

  foo() {
    console.log('Doing something...' + this.i);
    this.i++;
  }
}

let s1 = new Singleton();
let s2 = new Singleton();
console.log('Are they identical? ' + (s1 === s2));
s1.foo();
s2.foo();
