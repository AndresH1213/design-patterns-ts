"use strict";
class Machine {
}
class MultifunctionPrinter extends Machine {
    print(doc) { }
    fax(doc) { }
    scan(doc) { }
}
class NotImplementedError extends Error {
    constructor(msg) {
        super(msg);
    }
}
class OldFashionPrinter extends Machine {
    print(doc) { }
    fax(doc) {
        // do nothing
        // this violates the principle of least surprise, you don't want
        // to people who uses your interface be surprise, you want predictible
        // results
    }
    scan(doc) {
        throw new NotImplementedError('OldFashionedPrinter.scan');
    }
}
class Photocopier {
    print() {
        console.log('printing');
    }
    scan() {
        console.log('scaning');
    }
}
const doc = {};
let printer = new OldFashionPrinter();
const photocopier = new Photocopier();
photocopier.print();
photocopier.scan();
