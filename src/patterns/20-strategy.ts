// text processor
// html => <ul><li>hello</li></ul>
// markdown => * hello * world

enum OutputFormat {
  markdown,
  html,
}

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
  public listStrategy: ListStrategy;
  constructor(outputFormat: OutputFormat) {
    this.buffer = [];
    this.setOutputFormat(outputFormat);
  }

  setOutputFormat(format: OutputFormat) {
    switch (format) {
      case OutputFormat.markdown:
        this.listStrategy = new MarkdownListStrategy();
        break;
      case OutputFormat.html:
        this.listStrategy = new HtmlListStrategy();
        break;
    }
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

let tp = new TextProcessor(OutputFormat.markdown);
tp.appendList(['foo', 'bar', 'baz']);
console.log(tp.toString());

tp.clear();
tp.setOutputFormat(OutputFormat.html);
tp.appendList(['alpha', 'beta', 'gamma']);
console.log(tp.toString());
