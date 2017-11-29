import { Injectable } from '@angular/core';
import { Commentator } from '../models/commentator';
import { AffiliationsFormGroupMetadata, PeriodsFormGroupMetadata } from '../filters/filter/filter-formgroup';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ResultStreamerService {

  private resultStreamSource = new ReplaySubject<Array<Commentator>>(1);
  private filteredAffiliations: string[] = [];
  private filteredPeriods: string[] = [];
  private results: Commentator[];

  resultStream$ = this.resultStreamSource.asObservable();

  private static checkArraysForIdenticalValues(array1: any[], array2: any[]): boolean {
    for (const a1 of array1) {
      for (const a2 of array2) {
        if (a1 === a2) {
          return true;
        }
      }
    }
    return false;
  }

  private static updateFilteredBucketElementsArray(filterArray: string[], formFilter: any, bucketMetadata: any) {
    let resArray = filterArray;
    if (formFilter) {
      for (const k of Object.keys(formFilter)) {
        const filterTitle = bucketMetadata[k].title;
        if (!formFilter[ k ]) {
          if (resArray.indexOf(filterTitle) === -1) {
            resArray.push(filterTitle);
          }
        } else {
          resArray = resArray.filter(x => x !== filterTitle);
        }
      }
    }
    return resArray;
  }

  pushResultStream(result: Commentator[]) {
    this.results = result;
    this.filterResultStream();
  }

  filterResultStream() {
    const filteredResults = this.results
      .filter(x => !ResultStreamerService.checkArraysForIdenticalValues(x.affiliations, this.filteredAffiliations))
      .filter(x => this.filteredPeriods.indexOf(x.period) === -1);
    this.resultStreamSource.next(filteredResults);
  }

  updateFilters(filters: any) {
    this.filteredAffiliations = ResultStreamerService.updateFilteredBucketElementsArray(
      this.filteredAffiliations,
      filters[ 'affiliations' ],
      AffiliationsFormGroupMetadata);
    this.filteredPeriods = ResultStreamerService.updateFilteredBucketElementsArray(
      this.filteredPeriods,
      filters[ 'periods' ],
      PeriodsFormGroupMetadata
    );
    this.filterResultStream();
  }

}
