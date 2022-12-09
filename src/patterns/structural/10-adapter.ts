// hashing string helper for caching example

class StringHash extends String {
  hashCode?: () => string;
}

const stringPrototype: StringHash = String.prototype;
stringPrototype.hashCode = function () {
  //@ts-ignore
  if (Array.prototype.reduce) {
    return this.split('').reduce(function (a: number, b: string) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  }
  let hash = 0;
  if (this.length === 0) return hash;
  for (let i = 0; i < this.length; i++) {
    const character = this.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash; // convert to 32-bit integer
  }
  return hash;
};

class Point_ {
  constructor(public x: number, public y: number) {}

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

class Line {
  constructor(public start: Point_, public end: Point_) {}

  toString() {
    return `${this.start.toString()}->${this.end.toString()}`;
  }
}

class VectorObject extends Array {}

class VectorRctagle extends VectorObject {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    super();
    this.push(new Line(new Point_(x, y), new Point_(x + width, y)));
    this.push(new Line(new Point_(x, y), new Point_(x + width, y + height)));
    this.push(new Line(new Point_(x, y), new Point_(x, y + height)));
    this.push(new Line(new Point_(x, y), new Point_(x + width, y + height)));
  }
}

// have to work with this api
let drawPoint = function (point: string) {
  process.stdout.write('.');
};

// class LineToPointAdapter extends Array {
class LineToPointAdapter {
  static count = 0;
  static cache: any = {};
  public hash: string;
  constructor(line: Line) {
    // super();

    this.hash = (JSON.stringify(line) as StringHash).hashCode!();
    if (LineToPointAdapter.cache[this.hash]) return;

    console.log(
      `${LineToPointAdapter.count++}: Generating ` +
        `point for line ${line.toString()} (no caching)`
    );

    let points: any[] = [];

    let left = Math.min(line.start.x, line.end.x);
    let right = Math.max(line.start.x, line.end.x);
    let top = Math.min(line.start.y, line.end.y);
    let bottom = Math.max(line.start.y, line.end.y);

    if (right - left === 0) {
      for (let y = top; y <= bottom; ++y) {
        points.push(new Point_(left, y));
      }
    } else if (line.end.y - line.start.y === 0) {
      for (let x = left; x <= right; ++x) {
        points.push(new Point_(x, top));
      }
    }

    LineToPointAdapter.cache[this.hash] = points;
  }

  get items() {
    return LineToPointAdapter.cache[this.hash];
  }
}

let vectorObject = [
  new VectorRctagle(1, 1, 10, 10),
  new VectorRctagle(3, 3, 6, 6),
];

let drawPoints = function () {
  for (let vo of vectorObject) {
    for (let line of vo) {
      let adapter = new LineToPointAdapter(line);
      adapter.items.forEach(drawPoint);
    }
  }
};

drawPoints();
// this call does not call LineToPointer constructor logic
// that modify that specify line because already has processing it
drawPoints();

/**
 * The takeway is that sometimes the adapter dessign pattern causes you
 * to generate temporary objects, and if it does, it makes sense to try
 * to cut down on the number of objects you actually generate. So if you're
 * generating temporaries for objects that you've already encountered before,
 * it might make sense to put them into some sort of cache as we've done here.
 */
