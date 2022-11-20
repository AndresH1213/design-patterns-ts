// This example only ilustrates the problem that we would face in
// a non liskov-substitution principle, but here there is no solution
// implemented
class Rectagle {
  public width: number;
  public heigth: number;
  constructor(width: number, height: number) {
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
  constructor(size: number) {
    super(size, size);
  }
  // the constriction is that the height and the width is the same
}

let useIt = function (rc: Rectagle) {
  let width = rc.width;
  rc.heigth = 10;
  // in case that rc is a square is going to break this functionality
  // because change only one dimention would change it from square to rectangle
};

let rc = new Rectagle(2, 3);
useIt(rc);

let sq = new Square(5);
useIt(sq);
