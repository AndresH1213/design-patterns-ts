class Buffer_ extends Array {
  public width: number;
  public height: number;
  public alloc: any;
  constructor(width = 30, height = 20) {
    super();
    this.width = width;
    this.height = height;
    this.alloc(width * height);
  }

  write(text: string, position = 0) {
    // write the element to that buffer
  }
}

class ViewPort {
  public offset: number;
  constructor(public buffer = new Buffer_()) {
    this.offset = 0;
  }

  append(text: string, pos: number) {
    this.buffer.write(text, pos + this.offset);
  }

  getCharAt(index: number) {
    return this.buffer[this.offset + index];
  }
}
/**
 * Console is effectively a facade for all of those things that we brought
 * to, for subsystem related to buffers and buffer management
 */
class Console {
  public buffer: Buffer_;
  public currentViewport: ViewPort;
  public buffers: Buffer_[];
  public viewports: ViewPort[];
  constructor() {
    this.buffer = new Buffer_();
    this.currentViewport = new ViewPort(this.buffer);
    this.buffers = [this.buffer];
    this.viewports = [this.currentViewport];
  }

  write(text: string) {
    this.currentViewport.buffer.write(text);
  }

  getCharAt(index: number) {
    return this.currentViewport.getCharAt(index);
  }
}

// so we're setting all the defaults to what most users will actually want,
// but we are allowing users to gget all those power features. We are keeping
// lists of both buffers and viewport. so if you wwant a multi buffer or
// multiviewport console you can have it
let c = new Console();
c.write('hello');
let ch = c.getCharAt(0);
