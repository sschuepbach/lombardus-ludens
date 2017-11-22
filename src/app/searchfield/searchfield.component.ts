import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RetrieveDataService } from '../retrieve-data.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import { Commentator } from '../models/commentator';


@Component({
  selector: 'app-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: [ './searchfield.component.css' ]
})
export class SearchfieldComponent implements OnInit {

  searchInput: FormControl = new FormControl('');
  @Output() resultArray: EventEmitter<Commentator[]> = new EventEmitter<Commentator[]>();

  constructor(private retrieveData: RetrieveDataService) {
    this.searchInput
      .valueChanges
      .debounceTime(500)
      .switchMap(searchString => retrieveData.getData(searchString))
      .subscribe(
        res => {console.log(res); return this.emitResultArray(res);},
        err => { console.log("Error!")},
        () => console.log('Results retrieved')
      );
  }

  ngOnInit() {
  }

  emitResultArray(result: Commentator[]) {
    this.resultArray.emit(result);
  }


}
