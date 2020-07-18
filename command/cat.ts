const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const LF = "\n".charCodeAt(0);

class ByteBuffer {
  bytes: number[];

  constructor() {
    this.bytes = [];
  }

  push(val: number) {
    this.bytes.push(val);
  }

  toLine() {
    return textDecoder.decode(
      new Uint8Array(this.bytes),
    );
  }
}

class StdinReader {
  buf: ByteBuffer;

  constructor() {
    this.buf = new ByteBuffer();
  }

  async read(
    fn: (line: string) => void,
  ) {
    const readBuf = new Uint8Array(1024);

    const numRead = await Deno.stdin.read(readBuf);
    if (numRead === null) {
      return null;
    }

    for (let i = 0; i < numRead; i++) {
      const val = readBuf[i];
      this.buf.push(val);

      if (val === LF) {
        fn(this.buf.toLine());
        this.buf = new ByteBuffer();
      }
    }

    return numRead;
  }

  async eachLine(fn: (line: string) => void) {
    while (true) {
      const numRead = await this.read(fn);

      if (numRead === null) {
        fn(this.buf.toLine());
        break;
      }
    }

    return null;
  }
}

const print = (str: string) => {
  Deno.stdout.writeSync(
    textEncoder.encode(str),
  );
};

const main = () => {
  new StdinReader().eachLine((line) => {
    print(
      line
        .replace("\r", "<CR>")
        .replace("\n", "<LF>\n"),
    );
  });
};

export {
  main,
};
