"use strict";
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static newCartesianPoint(x, y) {
        return new Point(x, y);
    }
    static newPolartPoint(rho, theta) {
        return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
    }
}
let p = Point.newCartesianPoint(4, 5);
console.log(p);
let p2 = Point.newPolartPoint(5, Math.PI / 2);
console.log(p2);
