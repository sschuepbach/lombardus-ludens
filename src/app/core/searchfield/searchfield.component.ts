import { Component } from '@angular/core';
import { RetrieveDataService } from '../../searchutils/retrieve-data.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import { MapResultToModelService } from '../../models/map-result-to-model.service';
import { ResultStreamerService } from '../../searchutils/result-streamer.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: [ './searchfield.component.css' ]
})
export class SearchfieldComponent {

  searchInput: FormControl = new FormControl('');
  searching = false;

  constructor(private retrieveData: RetrieveDataService,
              private mrtm: MapResultToModelService,
              private rs: ResultStreamerService) {
    this.searchInput
      .valueChanges
      .filter(x => x.length >= 3)
      .debounceTime(500)
      .switchMap(searchString => retrieveData.getData(searchString))
      .subscribe(
        res => {
          if (res.type === HttpEventType.Sent) {
            this.searching = true;
          } else if (res instanceof HttpResponse) {
            this.rs.pushResultStream(this.mrtm.parseResult(res.body));
            this.searching = false;
          }
        },
        err => console.log(`Can't get results. Error code: %s, URL: %s`, err.message, err.url),
        () => console.log('Results retrieved'));
  }
}
