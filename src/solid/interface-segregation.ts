interface IDocument {}

abstract class Machine {
  abstract print(doc: IDocument): void;
  abstract fax(doc: IDocument): void;
  abstract scan(doc: IDocument): void;
}

class MultifunctionPrinter extends Machine {
  print(doc: IDocument) {}
  fax(doc: IDocument) {}
  scan(doc: IDocument) {}
}

class NotImplementedError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

class OldFashionPrinter extends Machine {
  print(doc: IDocument) {}
  fax(doc: IDocument) {
    // do nothing
    // this violates the principle of least surprise, you don't want
    // to people who uses your interface be surprise, you want predictible
    // results
  }
  scan(doc: IDocument) {
    throw new NotImplementedError('OldFashionedPrinter.scan');
  }
}

// ISP = segregate (split up)
interface Printer {
  print(): void;
}

interface Scaner {
  scan(): void;
}

class Photocopier implements Printer, Scaner {
  print(): void {
    console.log('printing');
  }
  scan(): void {
    console.log('scaning');
  }
}

const doc: IDocument = {};
let printer = new OldFashionPrinter();
const photocopier = new Photocopier();
photocopier.print();
photocopier.scan();
