"use strict";
// This example only ilustrates the problem that we would face in
// a non liskov-substitution principle, but here there is no solution
// implemented
class Rectagle {
    constructor(width, height) {
        this.width = width;
        this.heigth = height;
    }
    get area() {
        return this.width * this.heigth;
    }
    toString() {
        return `${this.width}*${this.heigth} = ${this.area}`;
    }
}
class Square extends Rectagle {
    constructor(size) {
        super(size, size);
    }
}
let useIt = function (rc) {
    let width = rc.width;
    rc.heigth = 10;
    // in case that rc is a square is going to break this functionality
    // because change only one dimention would change it from square to rectangle
};
let rc = new Rectagle(2, 3);
useIt(rc);
let sq = new Square(5);
useIt(sq);
