import { Component, OnInit } from '@angular/core';
import { ResultStreamerService } from '../../shared/searchutils/result-streamer.service';
import { Bucket, CounterService, Sorting } from '../../shared/aggregations/counter.service';
import { Commentator } from '../../shared/models/commentator';
import { LibrariesExtractor, TownsExtractor } from '../../shared/aggregations/ElementExtractor';

@Component({
  selector: 'app-aggregations',
  templateUrl: './aggregations.component.html'
})
export class AggregationsComponent implements OnInit {

  results: Commentator[];
  townsAlphabetically: Bucket[];
  townsByCount: Bucket[];
  libraries: Bucket[];
  alphabeticallySorted = true;

  constructor(private rs: ResultStreamerService, private counter: CounterService) {
    counter
      .register(new TownsExtractor())
      .register(new LibrariesExtractor());
    rs.resultStream$.subscribe(res => {
      counter.aggregate(res);
      this.results = res;
      this.libraries = counter.getType('LibrariesExtractor');
      this.townsAlphabetically = counter.getType('TownsExtractor', Sorting.ALPHABETICALLY);
      this.townsByCount = counter.getType('TownsExtractor', Sorting.BYCOUNT);
    });
  }

  ngOnInit() {
  }

}
