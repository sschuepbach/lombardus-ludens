import { Injectable } from '@angular/core';
import { Commentator } from '../models/commentator';
import { AffiliationsFormGroupMetadata, PeriodsFormGroupMetadata } from '../../filters/filter/filter-formgroup';
import { RetrieveDataService } from './retrieve-data.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MapResultToModelService } from '../models/map-result-to-model.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ResultStreamerService {

  private resultStreamSource = new BehaviorSubject<Array<Commentator>>([]);
  private searchingStateStreamSource = new BehaviorSubject<boolean>(false);
  private filteredAffiliations: string[] = [];
  private filteredPeriods: string[] = [];
  private results: Commentator[];

  resultStream$ = this.resultStreamSource.asObservable();
  searchingStateStream$ = this.searchingStateStreamSource.asObservable();
  private allResults: Commentator[];

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

  private static checkIfStringInCommentator(commentator: Commentator, str: string): boolean {
    return !!(ResultStreamerService.getAllTextualDataOfCommentator(commentator)
      .filter(x => x)
      .find(x => x.includes(str.toLowerCase())));
  }

  private static getAllTextualDataOfCommentator(commentator: Commentator) {
    const commentaries = commentator.commentaries;
    const manifestations = commentaries.reduce((x, y) => x.concat(y.manifestations), []);
    const items = manifestations.reduce((x, y) => x.concat(y.getItem()), []);
    return [ commentator.description.toLowerCase(), commentator.name.toLowerCase(), commentator.oid.toString() ]
      .concat(commentaries.reduce((x, y) => x.concat([ y.oid.toString(), y.title.toLowerCase() ]), []))
      .concat(manifestations.reduce((x, y) => x.concat([ y.oid.toString() ]), []))
      .concat(items.reduce((x, y) => x.concat([
        y.location ? y.location.toLowerCase() : undefined,
        y.library ? y.library.toLowerCase() : undefined,
        y.shelfmark ? y.shelfmark.toLowerCase() : undefined
      ]), []));
  }

  private static updateFilteredBucketElementsArray(filterArray: string[], formFilter: any, bucketMetadata: any) {
    let resArray = filterArray;
    if (formFilter) {
      for (const k of Object.keys(formFilter)) {
        const filterTitle = bucketMetadata[ k ].title;
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

  constructor(private rds: RetrieveDataService, private mrtm: MapResultToModelService) {
    rds.getData().subscribe(
      res => {
        if (res.type === HttpEventType.Sent) {
          this.searchingStateStreamSource.next(true);
        } else if (res instanceof HttpResponse) {
          this.allResults = this.mrtm.parseResult(res.body);
          this.filterCommentators();
          this.searchingStateStreamSource.next(false);
        }
      },
      err => console.log(`Can't get results. Error code: %s, URL: %s`, err.message, err.url),
      () => console.log('Results retrieved')
    );
  }

  filterCommentators() {
    // TODO: Implement search term filter
    const filteredResults = this.allResults
      .filter(x => ResultStreamerService.checkIfStringInCommentator(x, ''))
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
    if (this.results) {
      this.filterCommentators();
    }
  }

}
