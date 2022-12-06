// intrusive visitor

interface Expression3 {
  accept: (visitor: Visitor) => void;
}
class NumberExpression3 implements Expression3 {
  constructor(public value: number) {}

  accept(visitor: Visitor) {
    visitor.visitNumber(this);
  }
}

class AdditionExpression3 implements Expression3 {
  constructor(public left: Expression3, public right: Expression3) {}

  accept(visitor: Visitor) {
    visitor.visitAddition(this);
  }
}

class Visitor {
  buffer: any[];
  constructor() {
    this.buffer = [];
  }

  visitNumber(e: NumberExpression3) {}
  visitAddition(e: AdditionExpression3) {}
}

class ExpressionPrinter2 extends Visitor {
  constructor() {
    super();
  }

  visitNumber(e: NumberExpression3) {
    this.buffer.push(e.value);
  }
  visitAddition(e: AdditionExpression3) {
    this.buffer.push('(');
    e.left.accept(this);
    this.buffer.push('+');
    e.right.accept(this);
    this.buffer.push(')');
  }

  toString() {
    return this.buffer.join('');
  }
}

class ExpressionCalculator extends Visitor {
  result: number;
  constructor() {
    super();
    this.result = 0;
  }

  visitNumber(e: NumberExpression3): void {
    this.result = e.value;
  }

  visitAddition(e: AdditionExpression3): void {
    e.left.accept(this);
    let temp = this.result;
    e.right.accept(this);
    this.result += temp;
  }
}

// 1 + (2+3)
let e3 = new AdditionExpression3(
  new NumberExpression3(1),
  new AdditionExpression3(new NumberExpression3(3), new NumberExpression3(3))
);
let ep2 = new ExpressionPrinter2();
ep2.visitAddition(e3);

let ec = new ExpressionCalculator();
ec.visitAddition(e3);

console.log(`${ep2.toString()} = ${ec.result}`);
