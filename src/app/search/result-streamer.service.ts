import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Commentator } from '../models/commentator';

@Injectable()
export class ResultStreamerService {

  private resultStreamSource = new Subject<Array<Commentator>>();

  resultStream$ = this.resultStreamSource.asObservable();

  pushResultStream(result: Commentator[]) {
    this.resultStreamSource.next(result);
  }

}
