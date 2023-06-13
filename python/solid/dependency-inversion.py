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

class RelationshipBrowser(ABC):
    @abstractmethod
    def find_all_children_of(self, name: str) -> list[Person]:
        pass

class Relationships(RelationshipBrowser):
    def __init__(self):
        self.relations = []
    
    def add_parent_and_child(self, parent: Person, child: Person):
        self.relations.append(Relation(parent, child, Relationship.parent))
        self.relations.append(Relation(child, parent, Relationship.child))
    
    def find_all_children_of(self, name: str) -> list[Person]:
        person_objects = filter(lambda r: r.from_person.name == name and r.relationship == Relationship.parent, self.relations)
        return list(map(lambda r: r.to_person, person_objects))

class Research:
    def __init__(self, browser: RelationshipBrowser):
        for p in browser.find_all_children_of('John'):
            print(f'John has a child called {p.name}')

parent = Person('John')
child1 = Person('Chris')
child2 = Person('Matt')

relationships = Relationships()
relationships.add_parent_and_child(parent, child1)
relationships.add_parent_and_child(parent, child2)

Research(relationships)