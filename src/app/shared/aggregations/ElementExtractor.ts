import { Commentator } from '../models/commentator';

export abstract class ElementExtractor {
  readonly category: string;
  constructor(category: string) {
    this.category = category;
  }
  abstract extract(): (Commentator) => string[];
}

export class PeriodExtractor extends ElementExtractor {
  extract(): (Commentator) => string[] {
    return c => [].concat(c.period);
  }
}

export class AffiliationsExtractor extends ElementExtractor {
  extract(): (Commentator) => string[] {
    return c => c.affiliations;
  }
}

export class LibrariesExtractor extends ElementExtractor {
  private static getLibrariesFromCommentator(c: Commentator): string[] {
    return c.commentaries.reduce((x, y) => x.concat(y.manifestations.map(z =>
      (z.getItem().location ? z.getItem().location : '') +
      (z.getItem().library ? '#' + z.getItem().library : ''))), []);
  }

  extract(): (Commentator) => string[] {
    return c => LibrariesExtractor.getLibrariesFromCommentator(c);
  }
}

export class TownsExtractor extends ElementExtractor {
  private static getTownsFromCommentator(c: Commentator): string[] {
    return c.commentaries.reduce((x, y) => x.concat(y.manifestations.map(z =>
      (z.getItem().location ? z.getItem().location : ''))), []);
  }

  extract(): (Commentator) => string[] {
    return c => TownsExtractor.getTownsFromCommentator(c);
  }
}
