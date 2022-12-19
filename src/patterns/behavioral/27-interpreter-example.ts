enum nextOP {
  nothing,
  plus,
  minus,
}

class ExpressionProcessor {
  variables: any;
  constructor() {
    this.variables = {};
  }

  splitWithoutRegex(input) {
    let result: string[] = [];
    let buffer: string[] = [];

    for (let ch of input) {
      if (ch === '+' || ch === '-') {
        let final = `${buffer.join('')}${ch}`;
        result.push(final);
        buffer = [];
      } else {
        buffer.push(ch);
      }
    }

    if (buffer.length > 0) result.push(buffer.join(''));

    return result;
  }

  calculate(expression) {
    let current = 0;
    let nextop = nextOP.nothing;

    let parts = this.splitWithoutRegex(expression);

    for (let part of parts) {
      let noop = part.split('+-');
      let first = noop[0];
      let value = 0,
        z = 0;

      z = parseInt(first);

      if (!isNaN(z)) {
        value = z;
      } else if (first.length === 1 && this.variables[first[0]] !== undefined) {
        value = this.variables[first[0]];
      } else {
        return 0;
      }

      switch (nextop) {
        case nextOP.nothing:
          current = value;
          break;
        case nextOP.plus:
          current += value;
          break;
        case nextOP.minus:
          current -= value;
          break;
      }

      if (part.endsWith('+')) nextop = nextOP.plus;
      else if (part.endsWith('-')) nextop = nextOP.minus;
    }
    return current;
  }
}
