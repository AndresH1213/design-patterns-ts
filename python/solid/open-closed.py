from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Any
from enum import Enum

class Color(Enum):
    red = 'red'
    green = 'green'
    blue = 'blue'

class Size(Enum):
    small = 'small'
    medium = 'medium'
    large = 'large'

class Product:
    def __init__(self, name: str, color: Color, size: Size):
        self.name = name
        self.color = color
        self.size = size

class Specification:
    @abstractmethod
    def is_satisfied(self, item: Any) -> bool:
        pass
    
    def __and__(self, other):
        return AndSpecification(self, other)

class SizeSpecification(Specification):
    def __init__(self, size: Size):
        self.size = size
    
    def is_satisfied(self, item: Product) -> bool:
        return item.size == self.size
    
class ColorSpecification(Specification):
    def __init__(self, color: Color):
        self.color = color
    
    def is_satisfied(self, item: Product) -> bool:
        return item.color == self.color

class AndSpecification(Specification):
    def __init__(self, *specs: list[Specification]):
        self.specs = specs
    
    def is_satisfied(self, item: Product) -> bool:
        return all(map(lambda spec: spec.is_satisfied(item), self.specs))

class Filter(ABC):
    @abstractmethod
    def filter(self, items: list[Product], spec: Specification) -> list[Product]:
        pass
    
class SimpleFilter(Filter):
    def filter(self, items: list[Product], spec: Specification) -> list[Product]:
        return list(filter(lambda item: spec.is_satisfied(item), items))

apple = Product('Apple', Color.green, Size.small)
tree = Product('Tree', Color.green, Size.large)
house = Product('House', Color.blue, Size.large)

products = [apple, tree, house]

simple_filter = SimpleFilter()
print('Green products (new):')
green = ColorSpecification(Color.green)
for p in simple_filter.filter(products, green):
    print(f' - {p.name} is green')

print('Large and green products:')
spec = AndSpecification(
    ColorSpecification(Color.green), 
    SizeSpecification(Size.large)
  )

for p in simple_filter.filter(products, spec):
    print(f' - {p.name} is large and green')