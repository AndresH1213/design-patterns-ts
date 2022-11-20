"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
class Journal {
    constructor() {
        this.count = 0;
        this.entries = {};
    }
    addEntry(text) {
        let c = ++this.count;
        let entry = `${c}: ${text}`;
        this.entries[c.toString()] = entry;
        return c;
    }
    removeEntry(index) {
        delete this.entries[index];
    }
    toString() {
        return Object.values(this.entries).join('\n');
    }
}
class PersistenceManager {
    preprocess(j) {
        // do something
    }
    saveToFile(journal, filename) {
        (0, fs_1.writeFileSync)(filename, journal.toString());
    }
}
let j = new Journal();
j.addEntry('I cried today');
j.addEntry('I added a bug');
console.log(j.toString());
let p = new PersistenceManager();
let filename = (0, path_1.join)(__dirname, '..', 'temp', 'journal.txt');
p.saveToFile(j, filename);
