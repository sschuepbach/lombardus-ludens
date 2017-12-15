import { Injectable } from '@angular/core';
import { Commentator } from '../models/commentator';
import { ElementExtractor } from './ElementExtractor';

export enum Sorting {
  ALPHABETICALLY,
  BYCOUNT
}

export enum ValueShape {
  COUNTS,
  POINTERS
}


@Injectable()
export class AggregatorService {
  private extractors: ElementExtractor[] = [];
  private buckets: {
    elemType: string,
    name: string,
    pointers: number[]
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
    return AggregatorService.sortArrayAlphabetically(a, b);
  }

  register(e: ElementExtractor): this {
    this.extractors.push(e);
    return this;
  }

  aggregate(cc: Commentator[]) {
    this.reset();
    this.totalResultsCounter = cc.length;
    cc.forEach((c, i) => this.scan(c, i));
  }

  getType(elementType: string, valueShape?: ValueShape, sort?: Sorting) {
    const tempRes = this.buckets
      .filter(x => x.elemType === elementType)
      .map(x => ({ key: x.name, value: valueShape === ValueShape.POINTERS ? x.pointers : x.pointers.length }));
    if (sort === Sorting.ALPHABETICALLY) {
      return tempRes.sort((a, b) => AggregatorService.sortArrayAlphabetically(a, b));
    } else if (sort === Sorting.BYCOUNT && valueShape === ValueShape.COUNTS) {
      return tempRes.sort((a, b) => AggregatorService.sortArrayByCounts(a, b));
    }
    return tempRes;
  }

  private scan(c: Commentator, index: number) {
    if (this.extractors) {
      this.extractors
        .reduce((x, y) =>
          x.concat(y.extract()(c).map(z => ({ elemType: y.category, name: z, pointers: [index] }))), [])
        .map(x => {
          const inBuckets = this.inBuckets(x.name, x.elemType);
          inBuckets > -1 ? this.buckets[ inBuckets ].pointers.push(x.pointers[ 0 ]) : this.buckets.push(x);

        });
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
