import { Component } from '@angular/core';
import { CounterService } from '../../shared/searchutils/counter.service';
import { ResultStreamerService } from '../../shared/searchutils/result-streamer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  PeriodsFormGroupMetadata,
  PeriodsFormGroupData,
  AffiliationsFormGroupMetadata,
  AffiliationsFormGroupData
} from './filter-formgroup';
import { AffiliationsExtractor, PeriodExtractor } from '../../shared/searchutils/ElementExtractor';


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

  constructor(private results: ResultStreamerService, private counter: CounterService, private fb: FormBuilder) {
    this.createForm();
    counter
      .register(new PeriodExtractor())
      .register(new AffiliationsExtractor());
    results.resultStream$.subscribe(res => {
      counter.aggregate(res);
      FilterComponent.updateCountsInFilterFormMetadata(counter.getType('PeriodExtractor'),
        this.periodsMetadata,
        (this.filterForm.get('periods') as FormGroup));
      FilterComponent.updateCountsInFilterFormMetadata(counter.getType('AffiliationsExtractor'),
        this.affiliationsMetadata,
        (this.filterForm.get('affiliations') as FormGroup));
    });
    this.filterForm
      .valueChanges
      .subscribe(res => { if (this.filterForm.dirty) {this.results.updateFilters(res); }});
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

}
