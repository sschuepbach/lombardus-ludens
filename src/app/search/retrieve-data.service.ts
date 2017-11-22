import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { MapResultToModelService } from '../models/map-result-to-model.service';

@Injectable()
export class RetrieveDataService {

  constructor(private http: HttpClient, private mrtm: MapResultToModelService) { }

  getData(searchTerm: string) {
    return this.http
      .get('http://localhost:9200/test/test/_search?q=' + searchTerm)
      .map(res => this.mrtm.parseResult(res));
  }

}
