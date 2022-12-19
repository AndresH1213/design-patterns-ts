// intrusive visitor

interface Expression2 {}
class NumberExpression2 implements Expression2 {
  constructor(public value) {}
}

class AdditionExpression2 implements Expression2 {
  constructor(public left: Expression2, public right: Expression2) {}
}

class ExpressionPrinter {
  print(e: Expression2, buffer: any[]) {
    if (e instanceof NumberExpression2) {
      buffer.push(e.value);
    } else if (e instanceof AdditionExpression2) {
      buffer.push('(');
      this.print(e.left, buffer);
      buffer.push('+');
      this.print(e.right, buffer);
      buffer.push(')');
    }
  }
}

// 1 + (2+3)
let e2 = new AdditionExpression2(
  new NumberExpression2(1),
  new AdditionExpression2(new NumberExpression2(2), new NumberExpression2(3))
);
let buffer2 = [];
let ep = new ExpressionPrinter();
ep.print(e2, buffer2);
console.log(buffer2.join(''));
