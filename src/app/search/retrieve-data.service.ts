import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { MapResultToModelService } from '../models/map-result-to-model.service';

@Injectable()
export class RetrieveDataService {

  constructor(private http: HttpClient, private mrtm: MapResultToModelService) { }

  getData(searchTerm: string) {
    const httpHeaders = new HttpHeaders({'Accept': 'application/json'});
    httpHeaders.append('Content-Type', 'application/json');
    return this.http
      .map(res => this.mrtm.parseResult(res));
      .get('https://rcs.philsem.unibas.ch/json/' + searchTerm, {headers: httpHeaders});
  }

}
