import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RetrieveDataService {

  constructor(private http: HttpClient) { }

  getData(searchTerm: string) {
    const httpHeaders = new HttpHeaders({ 'Accept': 'application/json' });
    httpHeaders.append('Content-Type', 'application/json');
    const httpRequest = new HttpRequest(
      'GET',
      'https://rcs.philsem.unibas.ch/json/' + searchTerm,
      {
        headers: httpHeaders,
        reportProgress: true
      });
    return this.http.request(httpRequest);
  }

}
