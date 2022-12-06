// intrusive visitor

interface Expression {
  print: (buffer: any[]) => void;
}

class NumberExpression implements Expression {
  constructor(public value) {}

  print(buffer) {
    buffer.push(this.value.toString());
  }
}

class AdditionExpression implements Expression {
  constructor(public left: Expression, public right: Expression) {}

  print(buffer) {
    buffer.push('(');
    this.left.print(buffer);
    buffer.push('+');
    this.right.print(buffer);
    buffer.push(')');
  }
}

// 1 + (2+3)
let e = new AdditionExpression(
  new NumberExpression(1),
  new AdditionExpression(new NumberExpression(2), new NumberExpression(3))
);
let buffer = [];
e.print(buffer);
console.log(buffer.join(''));
