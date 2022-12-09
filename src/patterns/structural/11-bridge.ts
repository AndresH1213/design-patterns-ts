abstract class Renderer {
  abstract renderCircle(r: number): void;
}

class VectorRenderer extends Renderer {
  renderCircle(radius: number) {
    console.log(`Drawing a circle of radious ${radius}`);
  }
}

class RasterRenderer extends Renderer {
  renderCircle(radius: number) {
    console.log(`Drawing pixels circle of radious ${radius}`);
  }
}

abstract class Shape {
  constructor(public renderer: Renderer) {}
  abstract draw(): void;
}

class Circle extends Shape {
  constructor(renderer: Renderer, public radious: number) {
    super(renderer);
  }

  draw() {
    this.renderer.renderCircle(this.radious);
  }

  resize(factor: number) {
    this.radious *= factor;
  }
}

// class Square {}

// 1 hierarchy Shape -> Circle, Square, Triangle...
// 2 hierarchy Render => Raster, Vector, ...
let raster = new RasterRenderer();
let vector = new VectorRenderer();
let circle = new Circle(vector, 5);
circle.draw();
circle.resize(2);
circle.draw();
