import { Injectable } from '@angular/core';
import { Commentator } from '../models/commentator';

export interface Bucket {
  [index: string]: number;
}

export class Count {
  private totalResultsBucket;
  private periodBucket: Bucket;
  private affiliationBucket: Bucket;
  private libraryBucket: Bucket;
  private townBucket: Bucket;

  private static addTokenToBucket(token: string, bucket: Bucket) {
    return bucket.hasOwnProperty(token) ?
      bucket[ token ] += 1 :
      bucket[ token ] = 1;
  }

  private static serialiseBucketAsObjectArray(bucket: Bucket): any[] {
    const res = [];
    for (const k of Object.keys(bucket)) {
      res.push({ key: k, value: bucket[ k ] });
    }
    return res;
  }

  addOneToken() {
    this.totalResultsBucket += 1;
  }

  addPeriodToken(period: string) {
    Count.addTokenToBucket(period, this.periodBucket);
  }

  addAffiliationToken(affiliations: string[]) {
    for (const a of affiliations) {
      Count.addTokenToBucket(a, this.affiliationBucket);
    }
  }

  addLibrary(library: string) {
    Count.addTokenToBucket(library, this.libraryBucket);
  }

  addTown(town: string) {
    Count.addTokenToBucket(town, this.townBucket);
  }

  get totalResults() {
    return this.totalResultsBucket;
  }

  get periods() {
    return Count.serialiseBucketAsObjectArray(this.periodBucket);
  }

  get affiliations() {
    return Count.serialiseBucketAsObjectArray(this.affiliationBucket);
  }

  get libraries() {
    return Count.serialiseBucketAsObjectArray(this.libraryBucket);
  }

  get towns() {
    return Count.serialiseBucketAsObjectArray(this.townBucket);
  }

  resetCounter() {
    this.totalResultsBucket = 0;
    this.periodBucket = {};
    this.affiliationBucket = {};
    this.libraryBucket = {};
    this.townBucket = {};
  }

}

@Injectable()
export class CounterService {

  private count = new Count();

  private static countResults(resultSet: Commentator, fun: (x: Commentator) => void): Commentator {
    fun(resultSet);
    return resultSet;
  }

  aggregate(resultSet: Commentator[]) {
    this.count.resetCounter();
    resultSet
      .map(commentator => CounterService.countResults(commentator, c => this.count.addOneToken()))
      .map(commentator => CounterService.countResults(commentator, c => this.count.addAffiliationToken(c.affiliations)))
      .map(commentator => CounterService.countResults(commentator, c => this.count.addPeriodToken(c.period)))
      .map(commentator => CounterService.countResults(commentator, c => this.getLibrariesFromCommentator(c)))
      .map(commentator => CounterService.countResults(commentator, c => this.getTownsFromCommentator(c)));
    return this.count;
  }

  private getLibrariesFromCommentator(c: Commentator): void {
    for (const commentary of c.commentaries) {
      for (const manifestation of commentary.manifestations) {
        this.count.addLibrary(
          (manifestation.getItem().location ? manifestation.getItem().location : '') +
          (manifestation.getItem().library ? '#' + manifestation.getItem().library : ''));
      }
    }
  }

  private getTownsFromCommentator(c: Commentator): void {
    for (const commentary of c.commentaries) {
      for (const manifestation of commentary.manifestations) {
        this.count.addTown(manifestation.getItem().location);
      }
    }
  }

}