// https: //stackoverflow.com/questions/29879267/
var aggregation = (baseClass, ...mixins) => {
  class base extends baseClass {
    constructor(...args) {
      super(...args);
      mixins.forEach((mixin) => {
        copyProps(this, new mixin());
      });
    }
  }
  let copyProps = (target, source) => {
    // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source)
      //@ts-ignore
      .concat(Object.getOwnPropertySymbols(source))
      .forEach((prop) => {
        if (
          !prop.match(
            /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
          )
        )
          Object.defineProperty(
            target,
            prop,
            //@ts-ignore
            Object.getOwnPropertyDescriptor(source, prop)
          );
      });
  };
  mixins.forEach((mixin) => {
    // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};

class Connectable {
  connectTo(other) {
    for (let from of this as any) {
      for (let to of other) {
        from.out.push(to);
        to.in.push(from);
      }
    }
  }
}

/**
 * The take away from this example is that you can successfully connect both
 * scalar objects and collection objects together if you can get the scalar
 * object to masquerade itself as if it were a collection. And that's exactly
 * what we're doing here. In the Neuron case is we're basicallly returning an
 * iterator wich returns a single element wich actually just returns ourselves
 * And a as result, we can write very generic king of algorithms
 */

class Neuron extends Connectable {
  private in: Neuron[];
  private out: Neuron[];
  constructor() {
    super();
    this.in = [];
    this.out = [];
  }

  // connectTo(other: Neuron) {
  //   this.out.push(other);
  //   other.in.push(this);
  // }

  toString() {
    return `A neuron with ${this.in.length} inputs and ${this.out.length} outputs`;
  }

  [Symbol.iterator]() {
    let returned = 0;
    return {
      next: () => ({
        value: this,
        done: Boolean(returned++),
      }),
    };
  }
}

class NeuronLayer extends aggregation(Array, Connectable) {
  constructor(count: number) {
    super();
    while (count-- > 0) {
      this.push(new Neuron());
    }
  }

  toString() {
    return `A layer with ${this.length} neurons`;
  }
}

let neuron1 = new Neuron();
let neuron2 = new Neuron();
let layer1 = new NeuronLayer(3);
let layer2 = new NeuronLayer(4);

neuron1.connectTo(neuron2);
neuron1.connectTo(layer2);
layer2.connectTo(neuron1);
layer1.connectTo(layer2);

console.log(neuron1.toString());
console.log(neuron2.toString());
console.log(layer1.toString());
console.log(layer2.toString());
