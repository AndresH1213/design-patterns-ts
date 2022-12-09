class Generator {
  generate(count) {
    let result: any = [];
    for (let i = 0; i < count; ++i)
      result.push(Math.floor(Math.random() * 6 + 1));
    return result;
  }
}

class Splitter {
  split(array) {
    let result: any = [];

    let rowCount = array.length;
    let colCount = array[0].length;

    // get the rows
    for (let r = 0; r < rowCount; ++r) {
      let theRow: any = [];
      for (let c = 0; c < colCount; ++c) theRow.push(array[r][c]);
      result.push(theRow);
    }

    // get the columns
    for (let c = 0; c < colCount; ++c) {
      let theCol: any = [];
      for (let r = 0; r < rowCount; ++r) theCol.push(array[r][c]);
      result.push(theCol);
    }

    // now the diagonals
    let diag1: any = [];
    let diag2: any = [];
    for (let c = 0; c < colCount; ++c) {
      for (let r = 0; r < rowCount; ++r) {
        if (c === r) diag1.push(array[r][c]);
        let r2 = rowCount - r - 1;
        if (c === r2) diag2.push(array[r][c]);
      }
    }

    result.push(diag1);
    result.push(diag2);

    return result;
  }
}

class Verifier {
  verify(array) {
    if (array.length < 1) return false;
    let adder = function (p, c) {
      return p + c;
    };
    let expected = array[0].reduce(adder);
    let ok = true;
    let count = 0;
    array.forEach(function (subarray) {
      const result = subarray.reduce(adder);
      if (result !== expected) {
        console.log(result);
        ok = false;
      }
      console.log('correct', count++);
    });
    return ok;
  }
}

class MagicSquareGenerator {
  generate(size) {
    const generator = new Generator();
    const splitter = new Splitter();
    const verifier = new Verifier();

    let magicSquare: any = [];
    let isMagic = false;
    while (!isMagic) {
      for (let i = 0; i < size; i++) {
        magicSquare.push(generator.generate(size));
      }

      const combination = splitter.split(magicSquare);
      console.log(combination);
      isMagic = verifier.verify(combination);
    }

    return magicSquare;
  }
}

console.log(new MagicSquareGenerator().generate(2));
