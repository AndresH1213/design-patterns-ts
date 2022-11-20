"use strict";
// one enterprise pattern explanations as introduction
var Color;
(function (Color) {
    Color["red"] = "red";
    Color["green"] = "green";
    Color["blue"] = "blue";
})(Color || (Color = {}));
var Size;
(function (Size) {
    Size["small"] = "small";
    Size["medium"] = "medium";
    Size["large"] = "large";
})(Size || (Size = {}));
class Product {
    constructor(name, color, size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}
// open for extension, closed for modification
class ProductFilter {
    filterByColor(products, color) {
        return products.filter((p) => p.color === color);
    }
    filterBySize(products, size) {
        return products.filter((p) => p.size === size);
    }
}
class ColorSpecification {
    constructor(color) {
        this.color = color;
    }
    isSatisfied(item) {
        return item.color === this.color;
    }
}
class SizeSpecification {
    constructor(size) {
        this.size = size;
    }
    isSatisfied(item) {
        return item.size === this.size;
    }
}
// if we want to combine specifications for filter we can add a combinator
class AndSpecification {
    constructor(...specs) {
        this.specs = specs;
    }
    isSatisfied(item) {
        return this.specs.every((x) => x.isSatisfied(item));
    }
}
let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.green, Size.large);
let house = new Product('House', Color.blue, Size.large);
let products = [apple, tree, house];
let pf = new ProductFilter();
console.log(`Green products (old):`);
for (let p of pf.filterByColor(products, Color.green)) {
    console.log(` * ${p.name} is green`);
}
class BetterFilter {
    filter(items, spec) {
        return items.filter((x) => spec.isSatisfied(x));
    }
}
let bf = new BetterFilter();
console.log(`Green products (new):`);
for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
    console.log(` * ${p.name} is green`);
}
console.log(`Large and green products:`);
let spec = new AndSpecification(new SizeSpecification(Size.large), new ColorSpecification(Color.green));
for (let p of bf.filter(products, spec)) {
    console.log(` * ${p.name} is large and green`);
}
