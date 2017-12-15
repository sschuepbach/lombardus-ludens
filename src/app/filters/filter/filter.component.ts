import { AfterViewInit, Component } from '@angular/core';
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
  styleUrls: [ './filter.component.scss' ],
  providers: [ CounterService ]
})
export class FilterComponent implements AfterViewInit {

  filterForm: FormGroup;
  periods = PeriodsFormGroupData;
  periodsMetadata = PeriodsFormGroupMetadata;
  affiliations = AffiliationsFormGroupData;
  affiliationsMetadata = AffiliationsFormGroupMetadata;
  closedFilterViews = [];

  static updateCountsInFilterFormMetadata(bucketAsArray: any[], metadataObj: any) {
    for (const k of Object.keys(metadataObj)) {
      const matchingNameInCount = bucketAsArray.filter(x => x.key === metadataObj[ k ].title);
      metadataObj[ k ].count = matchingNameInCount.length > 0 ? matchingNameInCount[ 0 ].value : 0;
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
      FilterComponent.updateCountsInFilterFormMetadata(
        counter.getType('PeriodExtractor'),
        this.periodsMetadata
      );
      FilterComponent.updateCountsInFilterFormMetadata(
        counter.getType('AffiliationsExtractor'),
        this.affiliationsMetadata
      );
    });

    this.rts.filterParamsStream$.subscribe(x => {
      x.forEach(y => {
        if (this.filterForm.get(y)) {
          this.filterForm.get(y).setValue(false);
        }
      });
    });
  }

  ngAfterViewInit() {
    this.filterForm
      .valueChanges
      .subscribe(res => {
        this.results.updateFilters(res);
        if (this.filterForm.dirty) {
          this.rts.updateUrlFilterParamsFromCheckboxes(res);
        }
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
