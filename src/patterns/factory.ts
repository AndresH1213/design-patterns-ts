class Point {
  constructor(public x: number, public y: number) {}

  static newCartesianPoint(x: number, y: number) {
    return new Point(x, y);
  }

  static newPolartPoint(rho: number, theta: number) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

let p = Point.newCartesianPoint(4, 5);
console.log(p);

let p2 = Point.newPolartPoint(5, Math.PI / 2);
console.log(p2);
