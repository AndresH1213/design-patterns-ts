namespace ChainOfResponsibilityBroker {
  class Event {
    count: number;
    handlers: Map<any, any>;
    constructor() {
      this.handlers = new Map();
      this.count = 0;
    }

    subscribe(handler: () => void) {
      this.handlers.set(++this.count, handler);
      return this.count;
    }

    unsubscribe(idx: number) {
      this.handlers.delete(idx);
    }

    fire(sender: Creature, args: any) {
      this.handlers.forEach(function (v, k) {
        v(sender, args);
      });
    }
  }

  enum WhatToQuery {
    attack,
    defense,
  }

  class Query {
    constructor(
      public creatureName: string,
      public whatToQuery: WhatToQuery,
      public value: number
    ) {}
  }

  class Game {
    queries: Event;
    constructor() {
      this.queries = new Event();
    }

    performQuery(sender: Creature, query: Query) {
      this.queries.fire(sender, query);
    }
  }

  class Creature {
    public initial_attack: number;
    public initial_defense: number;
    constructor(public game: Game, public name: string, attack: number, defense: number) {
      this.initial_attack = attack;
      this.initial_defense = defense;
    }

    get attack() {
      let q = new Query(this.name, WhatToQuery.attack, this.initial_attack);
      this.game.performQuery(this, q);
      return q.value;
    }

    get defense() {
      let q = new Query(this.name, WhatToQuery.defense, this.initial_defense);
      this.game.performQuery(this, q);
      return q.value;
    }

    toString() {
      return `${this.name} (${this.attack}/${this.defense})`;
    }
  }

  abstract class CreatureModifier {
    token: number;
    constructor(public game: Game, public creature: Creature) {
      this.token = game.queries.subscribe(this.handle.bind(this));
    }

    abstract handle(sender: Creature, query: Query): void;
    dispose() {
      this.game.queries.unsubscribe(this.token);
    }
  }

  class DoubleAttackModifier_ extends CreatureModifier {
    constructor(game: Game, creature: Creature) {
      super(game, creature);
    }

    handle(sender: Creature, query: Query) {
      if (query.creatureName === this.creature.name && query.whatToQuery === WhatToQuery.attack) {
        query.value *= 2;
      }
    }
  }

  class IncreaseDefenseModifier extends CreatureModifier {
    constructor(game: Game, creature: Creature) {
      super(game, creature);
    }

    handle(sender: Creature, query: Query) {
      if (query.creatureName === this.creature.name && query.whatToQuery === WhatToQuery.defense) {
        query.value++;
      }
    }
  }

  let game = new Game();
  let superGoblin = new Creature(game, 'Strong Goblin', 2, 2);
  console.log(superGoblin.toString());

  let dam = new DoubleAttackModifier_(game, superGoblin);
  console.log(superGoblin.toString());

  let idm = new IncreaseDefenseModifier(game, superGoblin);
  console.log(superGoblin.toString());
  idm.dispose();

  console.log(superGoblin.toString());
}
