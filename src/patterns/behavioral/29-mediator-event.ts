class EventHandler {
  count: number;
  handlers: Map<any, any>;
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler: (...args) => void) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx: number) {
    this.handlers.delete(idx);
  }

  fire(sender: Guy, args: any) {
    this.handlers.forEach(function (v, k) {
      v(sender, args);
    });
  }
}

class GuyScoredEventArgs {
  constructor(public playerName: string, public goalsScoredSoFar: number) {}

  print() {
    console.log(
      `${this.playerName} has scored their ${this.goalsScoredSoFar} goal`
    );
  }
}

class Game5 {
  events: EventHandler;
  constructor() {
    this.events = new EventHandler();
  }
}

class Guy {
  goalsScored: number;
  constructor(public name: string, public game: Game5) {
    this.goalsScored = 0;
  }

  score() {
    this.goalsScored++;
    let args = new GuyScoredEventArgs(this.name, this.goalsScored);
    this.game.events.fire(this, args);
  }
}

class Coach {
  constructor(game: Game5) {
    game.events.subscribe(function (sender, args) {
      if (args instanceof GuyScoredEventArgs && args.goalsScoredSoFar < 3) {
        console.log(`coach says: well done, ${args.playerName}`);
      }
    });
  }
}

let game5 = new Game5();
let player = new Guy('sam', game5);
let coach = new Coach(game5);

player.score();
player.score();
player.score();
