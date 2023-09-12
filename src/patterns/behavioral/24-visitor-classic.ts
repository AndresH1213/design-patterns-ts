namespace VisictorClassic {
  interface Expression {
    accept: (visitor: Visitor) => void;
  }
  class NumberExpression implements Expression {
    constructor(public value: number) {}

    accept(visitor: Visitor) {
      visitor.visitNumber(this);
    }
  }

  class AdditionExpression implements Expression {
    constructor(public left: Expression, public right: Expression) {}

    accept(visitor: Visitor) {
      visitor.visitAddition(this);
    }
  }

  abstract class Visitor {
    buffer: any[];
    constructor() {
      this.buffer = [];
    }

    abstract visitNumber(e: NumberExpression): void;
    abstract visitAddition(e: AdditionExpression): void;
  }

  class ExpressionPrinter extends Visitor {
    constructor() {
      super();
    }

    visitNumber(e: NumberExpression) {
      this.buffer.push(e.value);
    }
    visitAddition(e: AdditionExpression) {
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

    visitNumber(e: NumberExpression): void {
      this.result = e.value;
    }

    visitAddition(e: AdditionExpression): void {
      e.left.accept(this);
      let temp = this.result;
      e.right.accept(this);
      this.result += temp;
    }
  }

  let e3 = new AdditionExpression(
    new NumberExpression(1),
    new AdditionExpression(new NumberExpression(4), new NumberExpression(3))
  );
  let ep2 = new ExpressionPrinter();
  ep2.visitAddition(e3);

  let ec = new ExpressionCalculator();
  ec.visitAddition(e3);

  console.log(`${ep2.toString()} = ${ec.result}`);
}
