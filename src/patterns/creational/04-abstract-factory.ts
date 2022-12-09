import realine from 'node:readline/promises';
const rl = realine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// The idea is that you can have a hierarchy of objects and you can
// have a related hierarchy of types

abstract class HotDrink {
  abstract consume(): void;
}

class Tea extends HotDrink {
  consume(): void {
    console.log('This tea is nice with lemon!');
  }
}

class Coffee extends HotDrink {
  consume(): void {
    console.log('This coffee is delicious!');
  }
}

abstract class HotDrinkFactory {
  abstract prepare(amount: number): HotDrink;
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount: number): Tea {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new Tea();
  }
}

class CoffeeFactory extends HotDrinkFactory {
  prepare(amount: number): Coffee {
    console.log(`Grind some beans, boild water, pout ${amount}ml`);
    return new Coffee();
  }
}

const AvailableDrink = {
  coffe: CoffeeFactory,
  tea: TeaFactory,
};

class HotDrinkMachine {
  public factories: any;
  constructor() {
    this.factories = { ...AvailableDrink };
  }

  interact(consumer: any) {
    rl.question('Please specify drink and amount (e.g, tea 50): ').then(
      (answer) => {
        let parts = answer.split(' ');
        let name = parts[0];
        let amount = parseInt(parts[1]);
        let d = this.factories[name].prepare(amount);
        rl.close();
        consumer(d);
      }
    );
  }

  // makeDrink(type: string) {
  //   switch (type) {
  //     case '':
  //       return new TeaFactory().prepare(200);
  //     case 'coffe':
  //       return new CoffeeFactory().prepare(50);
  //     default:
  //       throw new Error('');
  //   }
  // }
}

let machine = new HotDrinkMachine();
// rl.question('Which drink? ').then((answer) => {
//   const drink = machine.makeDrink(answer);
//   drink.consume();
// });
machine.interact(function (drink: HotDrink) {
  drink.consume();
});
