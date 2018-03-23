import { Component } from '@angular/core';
import { ResultStreamerService } from '../../shared/services/searchutils/result-streamer.service';
import { Commentator } from '../../shared/models/commentator';

@Component({
  selector: 'app-resultlist',
  template: `
    <p *ngIf="numberOfResults" style="color:#888;">Number of Results: {{numberOfResults}}</p>
    <div>
      <div *ngFor="let commentator of results; trackBy: trackByOid;" style="margin-bottom:0;">
        <app-result [commentator]="commentator"></app-result>
      </div>
    </div>
  `
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
