import { Manifestation } from './manifestation';
import { Serialisable } from './serialisable';

export class Commentary implements Serialisable<Commentary> {
  title: string;
  oid: number;
  manifestations: Manifestation[] = [];

  deserialise(input: any) {
    this.title = input.title;
    this.oid = input.oid;
    for (const m of input.manifestations) {
      this.manifestations.push(new Manifestation().deserialise(m));
    }
    return this;
  }
}
