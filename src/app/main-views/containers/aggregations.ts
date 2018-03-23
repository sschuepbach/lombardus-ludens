import { Component, OnInit } from '@angular/core';
import { ResultStreamerService } from '../../shared/services/searchutils/result-streamer.service';
import { AggregatorService, Sorting, ValueShape } from '../../shared/services/aggregations/aggregator.service';
import { Commentator } from '../../shared/models/commentator';
import { LibrariesExtractor, TownsExtractor } from '../../shared/services/aggregations/ElementExtractor';

interface Bucket {
  key: string;
  value: number | number[];
}

@Component({
  selector: 'app-aggregations',
  templateUrl: './aggregations.html',
  providers: [ AggregatorService ]
})
export class AggregationsComponent implements OnInit {

  results: Commentator[];
  townsAlphabetically: Bucket[];
  townsByCount: Bucket[];
  libraries: Bucket[];
  alphabeticallySorted = true;

  constructor(private rs: ResultStreamerService, private counter: AggregatorService) {
    counter
      .register(new TownsExtractor('TownsExtractor'))
      .register(new LibrariesExtractor('LibrariesExtractor'));
    rs.resultStream$.subscribe(res => {
      counter.aggregate(res);
      this.results = res;
      this.libraries = counter.getType('LibrariesExtractor', ValueShape.COUNTS);
      this.townsAlphabetically = counter.getType('TownsExtractor', ValueShape.COUNTS, Sorting.ALPHABETICALLY);
      this.townsByCount = counter.getType('TownsExtractor', ValueShape.COUNTS, Sorting.BYCOUNT);
    });
  }

  ngOnInit() {
  }

}
