export class Signed8Int {
  private _rawInt: string;

  constructor(rawInt: string) {

    // Check if raw int has 8bit
    if (rawInt.length !== 8) {
      throw Error("Int does not have 8b");
    }

    Array.from(rawInt).forEach((char) => {
      if (char !== "0" && char !== "1") throw Error("String is not in binary")
    })

    this._rawInt = rawInt;
  }

  static default(): Signed8Int {
    return new Signed8Int("00000000")
  }

  get rawInt() {
    return this._rawInt;
  }

  get sign(): "-" | "+" {
    return this.rawInt.at(0) === "0" ? "-" : "+"
  }

  get value(): string {
    return this.rawInt.slice(1);
  }

  get readableInt(): string {
    return `${this.sign}${parseInt(this.value, 2)}`
  }
}