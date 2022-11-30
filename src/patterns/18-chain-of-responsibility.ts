class Creature2 {
  constructor(
    public name: string,
    public attack: number,
    public defense: number
  ) {}
  toString() {
    return `${this.name} (${this.attack}/${this.defense})`;
  }
}

class CreatureModifier_ {
  next: any;
  constructor(public creature: Creature2) {
    this.next = null; // linked list
  }

  add(modifier: CreatureModifier_) {
    if (this.next) this.next.add(modifier);
    else this.next = modifier;
  }

  handle() {
    // this traverse the linked list and allow us to call the next handle
    if (this.next) this.next.handle();
  }
}

class DobleAttachaModifier extends CreatureModifier_ {
  constructor(creature: Creature2) {
    super(creature);
  }

  handle() {
    console.log(`Doubling ${this.creature.name}'s attack`);
    this.creature.attack *= 2;
    super.handle();
  }
}

class IncreaseDefenseModifier extends CreatureModifier_ {
  constructor(creature: Creature2) {
    super(creature);
  }

  handle() {
    if (this.creature.attack <= 2) {
      console.log(`Incresing ${this.creature.name}'s defense`);
      this.creature.defense++;
    }
    super.handle();
  }
}

class NoBonusesModifier extends CreatureModifier_ {
  constructor(creature: Creature2) {
    super(creature);
  }

  handle() {
    console.log('There are no modifier for you');
  }
}

let goblin = new Creature2('Globin', 1, 1);
console.log(goblin.toString());

let root = new CreatureModifier_(goblin);

// root.add(new NoBonusesModifier(goblin));

root.add(new DobleAttachaModifier(goblin));
root.add(new DobleAttachaModifier(goblin));

root.add(new IncreaseDefenseModifier(goblin));
root.handle();
console.log(goblin.toString());
