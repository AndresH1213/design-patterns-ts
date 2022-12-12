class FormattedText {
  caps: boolean[];
  constructor(public plainText: any) {
    this.caps = new Array(plainText.length).fill(false);
  }

  capitalize(start: number, end: number) {
    for (let i = start; i <= end; ++i) {
      this.caps[i] = true;
    }
  }

  toString() {
    let buffer: string[] = [];
    for (let i in this.plainText) {
      let c = this.plainText[i];
      buffer.push(this.caps[i] ? c.toUpperCase() : c);
    }
    return buffer.join('');
  }
}

class TextRange {
  capitalize: boolean;
  constructor(public start: number, public end: number) {
    this.capitalize = false;
  }

  covers(position: number) {
    return position >= this.start && position <= this.end;
  }
}

// this solution keeps the formatting externally. allow us to don't require the array of booleans any more
// It allows you to index into the formatting index, into the text whenever we actually need to apply it

class BetterFormattedText {
  formatting: any[];
  constructor(public plainText: any) {
    this.formatting = [];
  }

  getRange(start: number, end: number) {
    let range = new TextRange(start, end);
    this.formatting.push(range);
    return range;
  }

  toString() {
    let buffer: string[] = [];
    for (let i in this.plainText) {
      let c = this.plainText[i];

      // can be optimizations,this idea of going through every single range and checking whether or not it
      // covers a particular point is not the most efficient one.
      for (let range of this.formatting) {
        if (range.covers(i) && range.capitalize) {
          c = c.toUpperCase();
        }
        buffer.push(c);
      }
    }
    return buffer.join('');
  }
}

const text = 'This is a brave new world';
let ft = new FormattedText(text);
ft.capitalize(10, 15);
console.log(ft.toString());

const bft = new BetterFormattedText(text);
bft.getRange(16, 19).capitalize = true;
console.log(bft.toString());
