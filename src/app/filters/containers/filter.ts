import { AfterViewInit, Component } from '@angular/core';
import { AggregatorService, ValueShape } from '../../shared/services/aggregations/aggregator.service';
import { ResultStreamerService } from '../../shared/services/searchutils/result-streamer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  PeriodsFormGroupMetadata,
  PeriodsFormGroupData,
  AffiliationsFormGroupMetadata,
  AffiliationsFormGroupData
} from './filter-formgroup';
import { AffiliationsExtractor, PeriodExtractor } from '../../shared/services/aggregations/ElementExtractor';
import { RouteTrackingService } from '../../shared/services/routing/route-tracking.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.html',
  styleUrls: [ './filter.scss' ],
  providers: [ AggregatorService ]
})
export class FilterComponent implements AfterViewInit {

  filterForm: FormGroup;
  periods = PeriodsFormGroupData;
  periodsMetadata = PeriodsFormGroupMetadata;
  affiliations = AffiliationsFormGroupData;
  affiliationsMetadata = AffiliationsFormGroupMetadata;
  closedFilterViews = [];
  pristineFilter = {
    affiliations: true,
    periods: true
  };

  static updateCountsInFilterFormMetadata(bucketAsArray: any[], metadataObj: any) {
    for (const k of Object.keys(metadataObj)) {
      const matchingNameInCount = bucketAsArray.filter(x => x.key === metadataObj[ k ].title);
      metadataObj[ k ].count = matchingNameInCount.length > 0 ? matchingNameInCount[ 0 ].value : 0;
    }
  }

  constructor(private results: ResultStreamerService,
              private counter: AggregatorService,
              private fb: FormBuilder,
              private rts: RouteTrackingService) {
    this.createForm();
    counter
      .register(new PeriodExtractor('PeriodExtractor'))
      .register(new AffiliationsExtractor('AffiliationsExtractor'));
    results.resultStream$.subscribe(res => {
      counter.aggregate(res);
      FilterComponent.updateCountsInFilterFormMetadata(
        counter.getType('PeriodExtractor', ValueShape.COUNTS),
        this.periodsMetadata
      );
      FilterComponent.updateCountsInFilterFormMetadata(
        counter.getType('AffiliationsExtractor', ValueShape.COUNTS),
        this.affiliationsMetadata
      );
    });

    this.rts.filterParamsStream$.subscribe(x => {
      x.forEach(y => {
        if (this.filterForm.get(y)) {
          this.filterForm.get(y).setValue(false);
        }
      });
      this.disableCheckboxIfUniquelyCheckedInCategory(x);
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

  setPostPristineFilter(filterCategory: string, filter: string) {
    if (this.pristineFilter[ filterCategory ]) {
      this.setValueOfOtherFiltersInCategory(filterCategory, filter, false);
      this.filterForm.get([ filterCategory, filter ]).setValue(true);
      this.filterForm.get([ filterCategory, filter ]).disable();
      this.pristineFilter[ filterCategory ] = false;
    } else {
      if (!this.filterForm.get(filterCategory).get(filter).value) {
        if (this.getValueOfOtherFiltersInCategory(filterCategory, filter).true.length <= 1) {
          this.filterForm
            .get([ filterCategory, this.getValueOfOtherFiltersInCategory(filterCategory, filter).true[ 0 ] ])
            .disable();
        }
      } else {
        this.filterForm.get(filterCategory).enable();
      }
    }
  }

  private setValueOfOtherFiltersInCategory(pathToBaseFilter: string, baseFilterName: string, newValue: boolean) {
    Object.keys((this.filterForm.get(pathToBaseFilter) as FormGroup).getRawValue())
      .filter(x => x !== baseFilterName)
      .forEach(x => this.filterForm.get([ pathToBaseFilter, x ]).setValue(newValue));
  }

  private getValueOfOtherFiltersInCategory(pathToBaseFilter: string, excludedFilter?: string) {
    return Object.keys((this.filterForm.get(pathToBaseFilter) as FormGroup).getRawValue())
      .filter(x => x !== excludedFilter)
      .reduce((x, y) => {
        this.filterForm.get([ pathToBaseFilter, y ]).value ? x.true.push(y) : x.false.push(y);
        return x;
      }, {
        true: [],
        false: []
      });
  }

  private disableCheckboxIfUniquelyCheckedInCategory(setFilters: string[]) {
    const categories = setFilters.reduce((x, y) => {
      const category = y.split('.')[ 0 ];
      if (x.indexOf(category) === -1) {
        x.push(category);
      }
      return x;
    }, []);
    for (const cat of categories) {
      if (setFilters.filter(y => y.split('.')[ 0 ] === cat).length > 0 && this.pristineFilter[ cat ]) {
        if (this.getValueOfOtherFiltersInCategory(cat).true.length === 1) {
          this.filterForm.get([
            cat,
            this.getValueOfOtherFiltersInCategory(cat).true[ 0 ]
          ]).disable();
        }
      }
      this.pristineFilter[cat] = false;
    }
  }
}
