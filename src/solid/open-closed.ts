// one enterprise pattern explanations as introduction
enum Color {
  red = 'red',
  green = 'green',
  blue = 'blue',
}

enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

class Product {
  public name: string;
  public color: Color;
  public size: Size;
  constructor(name: string, color: Color, size: Size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

// specification
interface Specification {
  isSatisfied: (p: Product) => boolean;
}
class ColorSpecification implements Specification {
  public color: Color;
  constructor(color: Color) {
    this.color = color;
  }

  isSatisfied(item: Product) {
    return item.color === this.color;
  }
}

class SizeSpecification implements Specification {
  public size: Size;
  constructor(size: Size) {
    this.size = size;
  }

  isSatisfied(item: Product) {
    return item.size === this.size;
  }
}

// if we want to combine specifications for filter we can add a combinator
class AndSpecification {
  public specs: Specification[];
  constructor(...specs: Specification[]) {
    this.specs = specs;
  }

  isSatisfied(item: Product) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.green, Size.large);
let house = new Product('House', Color.blue, Size.large);

let products = [apple, tree, house];

class BetterFilter {
  filter(items: Product[], spec: Specification) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

let bf = new BetterFilter();
console.log(`Green products (new):`);
for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
  console.log(` * ${p.name} is green`);
}

console.log(`Large and green products:`);
let spec = new AndSpecification(
  new SizeSpecification(Size.large),
  new ColorSpecification(Color.green)
);
for (let p of bf.filter(products, spec)) {
  console.log(` * ${p.name} is large and green`);
}
