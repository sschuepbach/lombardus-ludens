import { Serialisable } from './serialisable';

abstract class Item implements Serialisable<Item> {
  location: string;
  library: string;
  shelfmark: string;

  deserialise(input: any) {
    this.location = input.location;
    this.library = input.library;
    this.shelfmark = input['shelf-mark'];
    return this;
  }

}

export class Manuscript extends Item {}

export class Earlyprint extends Item {}

export class Modernedition extends Item {}
