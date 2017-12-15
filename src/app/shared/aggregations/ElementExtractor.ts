import { Commentator } from '../models/commentator';
import { Earlyprint, Item, Manuscript } from '../models/item';

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

export class CommentatorNameExtractor extends ElementExtractor {
  extract(): (Commentator) => string[] {
    return c => [c.name];
  }
}

export class ManuscriptTypeExtractor extends ElementExtractor {

  private static mapManuscriptTypeToLabel(manuscriptType: Item) {
    if (manuscriptType instanceof Manuscript) {
      return 'manuscript';
    } else if (manuscriptType instanceof Earlyprint) {
      return 'early-print';
    }
    return 'modern-edition';
  }

  private static getManuscriptTypesFromCommentator(c: Commentator): string[] {
    return c.commentaries.reduce((x, y) => x.concat(y.manifestations.map(z => this.mapManuscriptTypeToLabel(z.getItem()))), []);
  }

  extract(): (Commentator) => string[] {
    return c => ManuscriptTypeExtractor.getManuscriptTypesFromCommentator(c);
  }
}
