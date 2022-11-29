class Shape1 {
  constructor() {}
}

class Circle4 extends Shape1 {
  constructor(public radius = 0) {
    super();
  }

  resize(factor: number) {
    this.radius *= factor;
  }

  toString() {
    return `A circle of radius ${this.radius}`;
  }
}

class ColoredShape extends Shape1 {
  constructor(public shape: Shape, public color: string) {
    super();
  }

  toString() {
    return `${this.shape.toString()} has the color ${this.color}`;
  }
}

class TransparentShape extends Shape1 {
  constructor(public shape: Shape1, public transparency: number) {
    super();
  }
  toString() {
    return `${this.shape.toString()} has ${
      this.transparency * 100.0
    }% transparency`;
  }
}

let cirscle = new Circle4(2);
console.log(cirscle.toString());

let redCircle = new ColoredShape(circle, 'red');
console.log(redCircle.toString());

let redHalfCircle = new TransparentShape(redCircle, 0.5);
//@ts-ignore
redHalfCircle.shape.shape.resize(3); // this is because redHalfCircle is not a circle so we have to
// call forward

console.log(redHalfCircle.toString());
