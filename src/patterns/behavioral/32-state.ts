class Switch {
  public state: State;
  constructor() {
    this.state = new OffState();
  }

  on() {
    this.state.on(this);
  }

  off() {
    this.state.off(this);
  }
}

abstract class State {
  on(sw: Switch): void {
    console.log(`Light is already on.`);
  }

  off(sw: Switch): void {
    console.log(`Light is already off.`);
  }
}

class OnState extends State {
  constructor() {
    super();
    console.log('Light turned on.');
  }

  off(sw: Switch): void {
    console.log('Turning light off...');
    sw.state = new OffState();
  }
}

class OffState extends State {
  constructor() {
    super();
    console.log('Light turned off.');
  }

  on(sw: Switch): void {
    console.log('Turning light on...');
    sw.state = new OnState();
  }
}

let sw = new Switch();
sw.on();
sw.off();
sw.off();
