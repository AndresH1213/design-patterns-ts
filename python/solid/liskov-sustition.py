from __future__ import annotations
from abc import ABC, abstractmethod


class Licensy(ABC):
    @abstractmethod
    def calculate_fee(self) -> float:
        pass
    
class PersonalLicensy(Licensy):
    def calculate_fee(self) -> float:
        return 100.0

class BusinessLicensy(Licensy):
    def calculate_fee(self) -> float:
        return 1000.0

class Billing:
    def __init__(self, licensy: Licensy):
        self.fee = licensy.calculate_fee()
        # ...
  