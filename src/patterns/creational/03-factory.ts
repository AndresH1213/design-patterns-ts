class Point {
  constructor(public x: number, public y: number) {}
}

class PointFactory {
  static newCartesianPoint(x: number, y: number) {
    return new Point(x, y);
  }

  static newPolartPoint(rho: number, theta: number) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

let p = PointFactory.newCartesianPoint(4, 5);
console.log(p);

let p2 = PointFactory.newPolartPoint(5, Math.PI / 2);
console.log(p2);
