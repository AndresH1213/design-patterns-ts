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

class ProductFilter:
    """
      State space explosion, this does not scale, what happens if we add more
      criterias?, we will have to add more methods to filter by, this is not
      scalable.
    """
    def filter_by_color(self, products: list[Product], color: Color):
        res_filter = filter(lambda p: p.color == color, products)
        return list(res_filter)
    
    def filter_by_size(self, products: list[Product], size: Size):
        res_filter = filter(lambda p: p.size == size, products)
        return list(res_filter)
    
apple = Product('Apple', Color.green, Size.small)
tree = Product('Tree', Color.green, Size.large)
house = Product('House', Color.blue, Size.large)

products = [apple, tree, house]

product_filter = ProductFilter()
print('Green products (old):')
for p in product_filter.filter_by_color(products, Color.green):
    print(f' - {p.name} is green')