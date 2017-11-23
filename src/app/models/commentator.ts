import { Commentary } from './commentary';
import { Serialisable } from './serialisable';

export class Commentator implements Serialisable<Commentator> {
  oid: number;
  name: string;
  affiliations: string[];
  period: string;
  description: string;
  commentaries: Commentary[] = [];

  deserialise(input: any) {
    this.oid = input.oid;
    this.name = input.name;
    this.affiliations = input.affiliations[0] === '' ? [] : input.affiliations;
    this.period = input.period;
    this.description = input.description;
    for (const c of input.commentaries) {
      this.commentaries.push(new Commentary().deserialise(c));
    }
    return this;
  }
}
