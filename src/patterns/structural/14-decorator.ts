namespace Decorator {
  class Shape {
    constructor() {}
  }

  class Circle extends Shape {
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

  class ColoredShape {
    constructor(public shape: Shape, public color: string) {}

    toString() {
      return `${this.shape.toString()} has the color ${this.color}`;
    }
  }

  class TransparentShape {
    constructor(public shape: Shape, public transparency: number) {}
    toString() {
      return `${this.shape.toString()} has ${this.transparency * 100.0}% transparency`;
    }
  }

  let circle1 = new Circle(2);
  console.log(circle1.toString());

  let redCircle = new ColoredShape(circle1, 'red');
  console.log(redCircle.toString());

  let redHalfCircle = new TransparentShape(redCircle, 0.5);
  //@ts-ignore
  redHalfCircle.shape.shape.resize(3); // this is because redHalfCircle is not a circle so we have to
  // call forward

  console.log(redHalfCircle.toString());
}
