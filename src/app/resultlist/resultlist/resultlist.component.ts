import { Component, OnInit } from '@angular/core';
import { ResultStreamerService } from '../../searchutils/result-streamer.service';
import { Commentator } from '../../models/commentator';
import { Count, CounterService } from '../../searchutils/counter.service';

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.component.html',
  styleUrls: [ './resultlist.component.css' ]
})
export class ResultlistComponent implements OnInit {

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
