from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Any

class Document:
    def __init__(self, content: Any):
        self.content = content

class Machine(ABC):
    @abstractmethod
    def print(self, document: Document):
        pass
    
    @abstractmethod
    def fax(self, document: Document):
        pass
    
    @abstractmethod
    def scan(self, document: Document):
        pass

class NotImplementedError(Exception):
    def __init__(self, message: str = ''):
        self.message = message

class MultiFunctionPrinter(Machine):
    def print(self, document: Document):
        pass
    
    def fax(self, document: Document):
        pass
    
    def scan(self, document: Document):
        pass
    
class OldFashionedPrinter(Machine):
    
    def print(self, document: Document):
        pass

    def fax(self, document: Document):
        raise NotImplementedError('Fax is not supported')
    
    def scan(self, document: Document):
        raise NotImplementedError('Scan is not supported')
    
doc = Document('Test document')
mfp = OldFashionedPrinter()
