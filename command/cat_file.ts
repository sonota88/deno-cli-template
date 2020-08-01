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

class FileReader {
  buf: ByteBuffer;
  path: string;
  file: Deno.File | null;

  constructor(path: string) {
    this.buf = new ByteBuffer();
    this.path = path;
    // this.file = await Deno.open(path);
    this.file = null;
  }

  async read(
    fn: (line: string) => void,
  ) {
    if (this.file == null) {
      this.file = await Deno.open(this.path);
    }

    const readBuf = new Uint8Array(1024);

    const numRead = await this.file.read(readBuf);
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

  close() {
    if (this.file != null) {
      Deno.close(this.file.rid);
    }
  }
}

const print = (str: string) => {
  Deno.stdout.writeSync(
    textEncoder.encode(str),
  );
};

const main = (path: string) => {
  const fr = new FileReader(path);

  fr.eachLine((line) => {
    print(
      line
        .replace("\r", "<CR>")
        .replace("\n", "<LF>\n"),
    );
  });

  fr.close();
};

export {
  main,
};
