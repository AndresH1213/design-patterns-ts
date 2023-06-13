from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Any
from enum import Enum


class Relationship(Enum):
    parent = 'parent'
    child = 'child'
    sibling = 'sibling'

class Relation:
    def __init__(self, from_person: Person, to_person: Person, relationship: Relationship):
        self.from_person = from_person
        self.to_person = to_person
        self.relationship = relationship

class Person:
    def __init__(self, name: str):
        self.name = name

class Relationships:
    def __init__(self):
        self.relations = []
    
    def add_parent_and_child(self, parent: Person, child: Person):
        self.relations.append(Relation(parent, child, Relationship.parent))
        self.relations.append(Relation(child, parent, Relationship.child))

class Research:
    def __init__(self, relationships: Relationships):
        relations = relationships.relations
        for p in filter(lambda r: r.from_person.name == 'John' and r.relationship == Relationship.parent, relations):
            print(f'John has a child called {p.to_person.name}')


parent = Person('John')
child1 = Person('Chris')
child2 = Person('Matt')

relationships = Relationships()
relationships.add_parent_and_child(parent, child1)
relationships.add_parent_and_child(parent, child2)

Research(relationships)