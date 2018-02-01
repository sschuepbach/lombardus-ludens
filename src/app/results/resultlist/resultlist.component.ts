import { Component } from '@angular/core';
import { ResultStreamerService } from '../../shared/searchutils/result-streamer.service';
import { Commentator } from '../../shared/models/commentator';

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.component.html'
})
export class ResultlistComponent {

  results: Commentator[];
  numberOfResults: number;

  constructor(private rs: ResultStreamerService) {
    rs.resultStream$.subscribe(res => {
      this.results = res;
      this.numberOfResults = res.length;
    });
  }

  // noinspection JSUnusedLocalSymbols, JSMethodCanBeStatic
  trackByOid(index: number, commentator: Commentator) {
    return commentator.oid;
  }

}
