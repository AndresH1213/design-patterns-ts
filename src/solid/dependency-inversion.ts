enum Relationship {
  parent,
  child,
  sibling,
}

interface IRelationship {
  from: Person;
  type: Relationship;
  to: Person;
}

class Person {
  constructor(public name: string) {}
}

// to fixt the dependency relationship between low and high level
// we use an abstract class
abstract class RelationshipBrowser {
  abstract findAllChildrenOf(name: string): Person[];
}

// LOW-LEVEL MODULE
class Relationships extends RelationshipBrowser {
  public data: IRelationship[];
  constructor() {
    super();
    this.data = [];
  }

  addParentAndChild(parent: Person, child: Person) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });
  }
  // this api should always gives the right result even if the data structure changes
  findAllChildrenOf(name: string) {
    return this.data
      .filter((r) => r.from.name === name && r.type === Relationship.parent)
      .map((r) => r.to);
  }
}

// HIGH-LEVEL MODULE
class Research {
  // dependecy problem
  // constructor(relationships: Relationships) {
  //   // find all children of John
  //   let relations = relationships.data;
  //   for (let rel of relations.filter(
  //     (r) => r.from.name === 'John' && r.type === Relationship.parent
  //   )) {
  //     console.log(`John has a child named ${rel.to.name}`);
  //   }

  // dependecy abstraction implementention
  constructor(browser: RelationshipBrowser) {
    for (let p of browser.findAllChildrenOf('John')) {
      console.log(`John has a child called ${p.name}`);
    }
  }
}

let parent1 = new Person('John');
let child1 = new Person('Chris');
let child2 = new Person('Matt');

let rels = new Relationships();
rels.addParentAndChild(parent1, child1);
rels.addParentAndChild(parent1, child2);

new Research(rels);
