import { Component } from '@angular/core';
import { CounterService } from '../../shared/aggregations/counter.service';
import { ResultStreamerService } from '../../shared/searchutils/result-streamer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  PeriodsFormGroupMetadata,
  PeriodsFormGroupData,
  AffiliationsFormGroupMetadata,
  AffiliationsFormGroupData
} from './filter-formgroup';
import { AffiliationsExtractor, PeriodExtractor } from '../../shared/aggregations/ElementExtractor';
import { RouteTrackingService } from '../../shared/routing/route-tracking.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: [ './filter.component.scss' ]
})
export class FilterComponent {

  filterForm: FormGroup;
  periods = PeriodsFormGroupData;
  periodsMetadata = PeriodsFormGroupMetadata;
  affiliations = AffiliationsFormGroupData;
  affiliationsMetadata = AffiliationsFormGroupMetadata;
  closedFilterViews = [];

  static updateCountsInFilterFormMetadata(bucketAsArray: any[], metadataObj: any, formData: FormGroup) {
    for (const k of Object.keys(metadataObj)) {
      const matchingNameInCount = bucketAsArray.filter(x => x.key === metadataObj[ k ].title);
      if (matchingNameInCount.length > 0) {
        metadataObj[ k ].count = matchingNameInCount[ 0 ].value;
        if (formData.get(k).disabled) {
          formData.get(k).enable();
        }
      } else {
        metadataObj[ k ].count = 0;
        if (formData.get(k).enabled && formData.get(k).value) {
          formData.get(k).disable();
        }
      }
    }
  }

  constructor(private results: ResultStreamerService,
              private counter: CounterService,
              private fb: FormBuilder,
              private rts: RouteTrackingService) {
    this.createForm();
    counter
      .register(new PeriodExtractor('PeriodExtractor'))
      .register(new AffiliationsExtractor('AffiliationsExtractor'));
    results.resultStream$.subscribe(res => {
      counter.aggregate(res);
      // this.filterForm.markAsDirty();
      FilterComponent.updateCountsInFilterFormMetadata(counter.getType('PeriodExtractor'),
        this.periodsMetadata,
        (this.filterForm.get('periods') as FormGroup));
      FilterComponent.updateCountsInFilterFormMetadata(counter.getType('AffiliationsExtractor'),
        this.affiliationsMetadata,
        (this.filterForm.get('affiliations') as FormGroup));
    });
    this.filterForm
      .valueChanges
      .subscribe(res => {
        if (this.filterForm.dirty) {
          results.updateFilters(res);
          rts.updateUrlFilterParamsFromCheckboxes(res);
        }
      });
    this.rts.filterParamsStream$.subscribe(x => {
      x.forEach(y => {
        if (this.filterForm.get(y)) {
          this.filterForm.get(y).setValue(false);
        }
      });
    });
  }

  createForm() {
    this.filterForm = this.fb.group({
        periods: this.fb.group(this.periods),
        affiliations: this.fb.group(this.affiliations)
      }
    );
  }

  // noinspection JSMethodCanBeStatic
  serialiseObjectAsArray(obj: any) {
    const res = [];
    for (const o of Object.keys(obj)) {
      res.push({ key: o, value: obj[ o ] });
    }
    return res;
  }

  toggleFilterView(filterName: string) {
    if (this.closedFilterViews.indexOf(filterName) > -1) {
      this.closedFilterViews = this.closedFilterViews.filter(x => x !== filterName);
    } else {
      this.closedFilterViews.push(filterName);
    }
  }

  closedFilterView(filterName: string) {
    return this.closedFilterViews.indexOf(filterName) > -1;
  }

}
