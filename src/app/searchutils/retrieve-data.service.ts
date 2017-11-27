import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RetrieveDataService {

  constructor(private http: HttpClient) { }

  getData(searchTerm: string) {
    const httpHeaders = new HttpHeaders({'Accept': 'application/json'});
    httpHeaders.append('Content-Type', 'application/json');
    return this.http
      .get('https://rcs.philsem.unibas.ch/json/' + searchTerm, {headers: httpHeaders});
  }

}
