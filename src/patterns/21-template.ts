abstract class Game3 {
  currentPlayer: number;
  abstract start(): void;
  abstract takeTurn(): void;
  abstract get haveWinner(): boolean;
  abstract get winningPlayer(): number;
  constructor(public numberOfPlayers: number) {
    this.currentPlayer = 0;
  }

  run() {
    this.start!();
    while (!this.haveWinner) {
      this.takeTurn();
    }
    console.log(`Player ${this.winningPlayer} wins`);
  }
}

class Chess extends Game3 {
  maxTurns: number;
  turn: number;
  constructor() {
    super(2);
    this.maxTurns = 10;
    this.turn = 1;
  }

  start(): void {
    console.log(
      `Strating a game of chess ` + `with ${this.numberOfPlayers} players`
    );
  }
  takeTurn(): void {
    console.log(
      `Turn ${this.turn++} taken by ` + `player ${this.currentPlayer}.`
    );
    this.currentPlayer = (this.currentPlayer + 1) % this.numberOfPlayers;
  }
  get haveWinner(): boolean {
    return this.turn === this.maxTurns;
  }
  get winningPlayer(): number {
    return this.currentPlayer;
  }
}

let chess = new Chess();
chess.run();
