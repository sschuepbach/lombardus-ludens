import { Injectable } from '@angular/core';
import { Commentator } from '../models/commentator';
import { ElementExtractor } from './ElementExtractor';

export enum Sorting {
  ALPHABETICALLY,
  BYCOUNT
}

export interface Bucket {
  key: string;
  value: number;
}

@Injectable()
export class CounterService {
  private extractors: ElementExtractor[] = [];
  private buckets: {
    elemType: string,
    name: string,
    count: number
  }[];
  private totalResultsCounter;

  private static sortArrayAlphabetically(a: any, b: any): number {
    if (a.key < b.key) {
      return -1;
    } else if (a.key > b.key) {
      return 1;
    }
    return 0;
  }

  private static sortArrayByCounts(a: any, b: any): number {
    if (a.value < b.value) {
      return 1;
    } else if (a.value > b.value) {
      return -1;
    }
    return CounterService.sortArrayAlphabetically(a, b);
  }

  register(e: ElementExtractor): this {
    this.extractors.push(e);
    return this;
  }

  aggregate(cc: Commentator[]) {
    this.reset();
    cc.forEach(c => this.scan(c));
  }

  getType(elementType: string, sort?: Sorting) {
    const tempRes = this.buckets
      .filter(x => x.elemType === elementType)
      .map(x => ({ key: x.name, value: x.count }));
    if (sort === Sorting.ALPHABETICALLY) {
      return tempRes.sort((a, b) => CounterService.sortArrayAlphabetically(a, b));
    } else if (sort === Sorting.BYCOUNT) {
      return tempRes.sort((a, b) => CounterService.sortArrayByCounts(a, b));
    }
    return tempRes;
  }

  totalResults() {
    return this.buckets.length;
  }

  private scan(c: Commentator) {
    this.totalResultsCounter += 1;
    if (this.extractors) {
      this.extractors
        .reduce((x, y) =>
          x.concat(y.extract()(c).map(z => ({ elemType: y.category, name: z, count: 1 }))), []
        )
        .forEach(x => {
            const inBuckets = this.inBuckets(x.name, x.elemType);
            inBuckets > -1 ? this.buckets[ inBuckets ].count += 1 : this.buckets.push(x);
          }
        );
    }
  }

  private reset() {
    this.buckets = [];
    this.totalResultsCounter = 0;
  }

  private inBuckets(name: string, type: string) {
    for (const b in this.buckets) {
      if (this.buckets[ b ].elemType === type && this.buckets[ b ].name === name) {
        return b;
      }
    }
    return -1;
  }

}
