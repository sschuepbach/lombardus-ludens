import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { MapResultToModelService } from '../models/map-result-to-model.service';

@Injectable()
export class RetrieveDataService {

  constructor(private http: HttpClient, private mrtm: MapResultToModelService) { }

  getData(searchTerm: string) {
    return this.http
      .get('https://rcs.philsem.unibas.ch/json/' + searchTerm)
      .map(res => this.mrtm.parseResult(res));
  }

}
