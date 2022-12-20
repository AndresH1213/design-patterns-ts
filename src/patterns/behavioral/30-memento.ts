class Memento {
  constructor(public balance: number) {}
}

class BackAccount_1 {
  public changes: Memento[];
  public current: number;
  constructor(public balance: number = 0) {
    this.changes = [new Memento(balance)];
    this.current = 0;
  }

  deposit(amount: number) {
    this.balance += amount;
    let m = new Memento(this.balance);
    this.changes.push(m);
    this.current++;
    return m;
  }

  restore(m?: Memento) {
    if (m) {
      this.balance = m.balance;
      this.changes.push(m);
      this.current = this.changes.length - 1;
    }
  }

  undo() {
    if (this.current > 0) {
      let m = this.changes[--this.current];
      this.balance = m.balance;
      return m;
    }
    return null;
  }

  redo() {
    if (this.current + 1 < this.changes.length) {
      let m = this.changes[++this.current];
      this.balance = m.balance;
      return m;
    }
    return null;
  }

  toString() {
    return `Balance: ${this.balance}`;
  }
}

let baa = new BackAccount_1(100);
let m1 = ba.deposit(50);
let m2 = ba.deposit(25);
console.log(ba.toString()); // 175

baa.undo(); // 150
console.log('Undo 1:', ba.toString());

baa.undo(); // 100
console.log('Undo 2:', ba.toString());

baa.redo(); // 150
console.log('Redo: ', ba.toString());
