import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RetrieveDataService {

  constructor(private http: HttpClient) { }

  getData() {
    const httpHeaders = new HttpHeaders({ 'Accept': 'text' });
    httpHeaders.append('Content-Type', 'text');
    const httpRequest = new HttpRequest(
      'GET',
      'https://rcs.philsem.unibas.ch/json-all/',
      {
        headers: httpHeaders,
        reportProgress: true
      });
    return this.http.request(httpRequest);
  }

}
