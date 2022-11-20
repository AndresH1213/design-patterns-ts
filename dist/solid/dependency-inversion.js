"use strict";
var Relationship;
(function (Relationship) {
    Relationship[Relationship["parent"] = 0] = "parent";
    Relationship[Relationship["child"] = 1] = "child";
    Relationship[Relationship["sibling"] = 2] = "sibling";
})(Relationship || (Relationship = {}));
class Person {
    constructor(name) {
        this.name = name;
    }
}
// to fixt the dependency relationship between low and high level
// we use an abstract class
class RelationshipBrowser {
}
// LOW-LEVEL MODULE
class Relationships extends RelationshipBrowser {
    constructor() {
        super();
        this.data = [];
    }
    addParentAndChild(parent, child) {
        this.data.push({
            from: parent,
            type: Relationship.parent,
            to: child,
        });
    }
    // this api should always gives the right result even if the data structure changes
    findAllChildrenOf(name) {
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
    constructor(browser) {
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
