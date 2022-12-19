// text processor
// html => <ul><li>hello</li></ul>
// markdown => * hello * world

abstract class ListStrategy {
  abstract start(buffer: string[]): void;
  end(buffer: string[]) {}
  abstract addListItem(buffer: string[], item: string): void;
}

class MarkdownListStrategy extends ListStrategy {
  start(buffer: string[]): void {}
  addListItem(buffer: string[], item: string): void {
    buffer.push(` * ${item}`);
  }
}

class HtmlListStrategy extends ListStrategy {
  start(buffer: string[]): void {
    buffer.push('<ul>');
  }

  end(buffer: string[]): void {
    buffer.push('</ul>');
  }

  addListItem(buffer: string[], item: string): void {
    buffer.push(` <li>${item}</li>`);
  }
}

class TextProcessor {
  public buffer: string[];
  constructor(public listStrategy: ListStrategy) {
    this.buffer = [];
  }

  setOutputFormat(listStrategy: ListStrategy) {
    this.listStrategy = listStrategy;
  }

  appendList(items: string[]) {
    this.listStrategy.start(this.buffer);

    for (let item of items) {
      this.listStrategy.addListItem(this.buffer, item);
    }

    this.listStrategy.end(this.buffer);
  }

  clear() {
    this.buffer = [];
  }

  toString() {
    return this.buffer.join('\n');
  }
}

const markdownStrategy = new MarkdownListStrategy();
let tp = new TextProcessor(markdownStrategy);
tp.appendList(['foo', 'bar', 'baz']);
console.log(tp.toString());

const htmlStrategy = new HtmlListStrategy();
tp.clear();
tp.setOutputFormat(htmlStrategy);
tp.appendList(['alpha', 'beta', 'gamma']);
console.log(tp.toString());
