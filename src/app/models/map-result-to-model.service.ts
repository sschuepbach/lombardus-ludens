import { Injectable } from '@angular/core';
import { Commentator } from './commentator';

@Injectable()
export class MapResultToModelService {

  constructor() { }

  // noinspection JSMethodCanBeStatic
  parseResult(res: any) {
    const parsedResults: Commentator[] = [];
    for (const r of res['commentators']) {
      parsedResults.push(new Commentator().deserialise(r));
    }
    return parsedResults;
  }

}
