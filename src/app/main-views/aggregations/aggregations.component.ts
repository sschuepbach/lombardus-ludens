import { Component, OnInit } from '@angular/core';
import { ResultStreamerService } from '../../searchutils/result-streamer.service';
import { Bucket, Count, CounterService } from '../../searchutils/counter.service';
import { Commentator } from '../../models/commentator';

@Component({
  selector: 'app-aggregations',
  templateUrl: './aggregations.component.html',
  styleUrls: [ './aggregations.component.css' ]
})
export class AggregationsComponent implements OnInit {

  count: Count;
  results: Commentator[];
  libraries: Bucket[];
  towns: any[];
  alphabeticallySorted = true;

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
    return AggregationsComponent.sortArrayAlphabetically(a, b);
  }

  constructor(private rs: ResultStreamerService, private counter: CounterService) {
    rs.resultStream$.subscribe(res => {
      this.count = counter.aggregate(res);
      this.results = res;
      this.libraries = this.count.libraries;
      this.towns = this.count.towns;
    });
  }

  ngOnInit() {
  }

  sortAlphabetically(obj: any[]) {
    return obj ? obj.sort((a, b) => AggregationsComponent.sortArrayAlphabetically(a, b)) : obj;
  }

  sortByCounts(obj: any[]) {
    return obj ? obj.sort((a, b) => AggregationsComponent.sortArrayByCounts(a, b)) : obj;
  }

}
