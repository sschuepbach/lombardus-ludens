import { Commentary } from './commentary';
import { Serialisable } from './serialisable';

export class Commentator implements Serialisable<Commentator> {
  oid: number;
  name: string;
  affiliation: string[];
  period: string;
  description: string;
  commentaries: Commentary[] = [];

  deserialise(input: any) {
    this.oid = input.oid;
    this.name = input.name;
    this.affiliation = input.affiliation;
    this.period = input.period;
    this.description = input.description;
    for (const c of input.commentaries) {
      this.commentaries.push(new Commentary().deserialise(c));
    }
    return this;
  }
}
