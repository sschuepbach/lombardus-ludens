import { Earlyprint, Manuscript, Modernedition } from './item';
import { Serialisable } from './serialisable';

export class Manifestation implements Serialisable<Manifestation> {
  oid: number;
  manuscript: Manuscript;
  earlyprint: Earlyprint;
  modernedition: Modernedition;

  deserialise(input: any) {
    this.oid = input.oid;
    if (input.hasOwnProperty('manuscript')) {
      this.manuscript = new Manuscript().deserialise(input[ 'manuscript' ]);
    }
    if (input.hasOwnProperty('early-print')) {
      this.earlyprint = new Earlyprint().deserialise(input[ 'early-print' ]);
    }
    if (input.hasOwnProperty('modern-edition')) {
      this.modernedition = new Modernedition().deserialise(input[ 'modern-edition' ]);
    }
    return this;
  }

  getItem() {
    if (this.manuscript) {
      return this.manuscript;
    } else if (this.earlyprint) {
      return this.earlyprint;
    } else if (this.modernedition) {
      return this.modernedition;
    } else {
      return null;
    }
  }
}
