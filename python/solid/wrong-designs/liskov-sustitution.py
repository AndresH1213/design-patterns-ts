class Rectangle:
    def __init__(self, width: int, height: int):
        self._width = width
        self._height = height
    
    @property
    def area(self) -> int:
        return self._width * self._height
    
    def __str__(self) -> str:
        return f'Width: {self._width}, height: {self._height} = area: {self.area}'
    
class Square(Rectangle):
    def __init__(self, size: int):
        super().__init__(size, size)
    
    @Rectangle.width.setter
    def width(self, value: int):
        self._width = self._height = value
    
    @Rectangle.height.setter
    def height(self, value: int):
        self._width = self._height = value


def use_it(rc: Rectangle):
    w = rc._width
    rc.height = 10
    expected = int(w * 10)
    print(f'Expected an area of {expected}, got {rc.area}')

rc = Rectangle(2, 3)
use_it(rc)

sq = Square(5)
use_it(sq)