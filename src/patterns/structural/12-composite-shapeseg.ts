// So graphic object is going to be both a single object if it's used as a base
// class as well as a collection of objects, if it's used by itself.
namespace Composite {
  class GraphicObject {
    static count = 0;
    private _name: string;
    public color?: string;
    public children: GraphicObject[];
    constructor(name: string = 'Group ' + GraphicObject.count++) {
      this._name = name;
      this.color = undefined;
      this.children = [];
    }
    get name() {
      return this._name;
    }

    print(buffer: string[], depth: number) {
      buffer.push('*'.repeat(depth));
      if (depth > 0) {
        buffer.push(' ');
      }
      if (this.color) {
        buffer.push(this.color + ' ');
      }
      buffer.push(this.name);
      buffer.push('\n');

      for (let child of this.children) {
        child.print(buffer, depth + 1);
      }
    }

    toString() {
      let buffer = [];
      this.print(buffer, 0);
      return buffer.join('');
    }
  }

  class Circle extends GraphicObject {
    constructor(public color: string) {
      super('Circle');
    }
  }

  class Square extends GraphicObject {
    constructor(public color: string) {
      super('Square');
    }
  }

  let drawing = new GraphicObject();
  drawing.children.push(new Square('Red'));
  drawing.children.push(new Circle('Yellow'));

  let group = new GraphicObject();
  group.children.push(new Circle('Blue'));
  group.children.push(new Square('Blue'));
  drawing.children.push(group);

  console.log(drawing.toString());
}
