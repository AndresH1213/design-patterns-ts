from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Any

class Document:
    def __init__(self, content: Any):
        self.content = content

class Printer(ABC):
    @abstractmethod
    def print(self, document: Document):
        pass

class Scanner(ABC):
    @abstractmethod
    def scan(self, document: Document):
        pass

class Photocopier(Printer, Scanner):
    def print(self):
        print('Printing...')
    
    def scan(self):
        print('Scanning...')
    

doc = Document('Test document')
photocopier = Photocopier()
photocopier.print()
photocopier.scan()

        