enum StatType {
  STRENGTH,
  AGILITY,
  INTELLIGENCE,
}
namespace IteratorArray {
  class Creature {
    public stats: any[];
    constructor() {
      // this.strength = this.agility
      //   = this.intelligence = 10;
      this.stats = new Array(3).fill(10);
    }

    get strength() {
      return this.stats[StatType.STRENGTH];
    }

    set strength(value) {
      this.stats[StatType.STRENGTH] = value;
    }

    get agility() {
      return this.stats[StatType.AGILITY];
    }

    set agility(value) {
      this.stats[StatType.AGILITY] = value;
    }

    get intelligence() {
      return this.stats[StatType.INTELLIGENCE];
    }

    set intelligence(value) {
      this.stats[StatType.INTELLIGENCE] = value;
    }

    get sumOfStats() {
      return this.stats.reduce((x, y) => x + y, 0);
    }

    get averageStat() {
      return this.sumOfStats / this.stats.length;
    }

    get maxStat() {
      return Math.max(...this.stats);
    }

    // get sumOfStats()
    // {
    //   return this.strength + this.agility
    //     + this.intelligence;
    // }
    //
    // get averageStat()
    // {
    //   return sumOfStats() / 3.0; // magic number
    // }
    //
    // get maxStat()
    // {
    //   return Math.max(this.strength, this.agility,
    //     this.intelligence);
    // }
  }

  let creature = new Creature();
  creature.strength = 10;
  creature.agility = 11;
  creature.intelligence = 15;
  console.log(
    `Creature has average stat ${creature.averageStat}, ` +
      `max stat = ${creature.maxStat}, ` +
      `sum of stats = ${creature.sumOfStats}.`
  );
}
