import { writeFileSync } from 'fs';
import { join } from 'path';

interface Entries {
  [c: string]: string;
}

class Journal {
  public entries: Entries;
  public count = 0;
  constructor() {
    this.entries = {};
  }

  addEntry(text: string) {
    let c = ++this.count;
    let entry = `${c}: ${text}`;
    this.entries[c.toString()] = entry;
    return c;
  }

  removeEntry(index: number) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join('\n');
  }
}

class PersistenceManager {
  preprocess(j: any) {
    // do something
  }

  saveToFile(journal: Journal, filename: string) {
    writeFileSync(filename, journal.toString());
  }
}

let j = new Journal();
j.addEntry('I cried today');
j.addEntry('I added a bug');
console.log(j.toString());

let p = new PersistenceManager();
let filename = join(__dirname, '..', 'temp', 'journal.txt');
p.saveToFile(j, filename);
