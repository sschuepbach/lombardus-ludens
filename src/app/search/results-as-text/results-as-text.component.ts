import { Component, OnInit } from '@angular/core';
import { ResultStreamerService } from '../result-streamer.service';
import { Commentator } from '../../models/commentator';
import { Count, CounterService } from '../counter.service';

@Component({
  selector: 'app-results-as-text',
  templateUrl: './results-as-text.component.html',
  styleUrls: [ './results-as-text.component.css' ]
})
export class ResultsAsTextComponent implements OnInit {

  results: Commentator[];
  count: Count;

  constructor(private rs: ResultStreamerService, private counter: CounterService) {
    rs.resultStream$.subscribe(res => {
      this.count = this.counter.aggregate(res);
      this.results = res;
    });
  }

  ngOnInit() {
  }



}
