import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ResultStreamerService } from '../../shared/searchutils/result-streamer.service';
import { Commentator } from '../../shared/models/commentator';
import { AggregatorService, Sorting, ValueShape } from '../../shared/aggregations/aggregator.service';
import {
  AffiliationsExtractor,
  CommentatorNameExtractor,
  LibrariesExtractor, ManuscriptTypeExtractor, PeriodExtractor,
  TownsExtractor
} from '../../shared/aggregations/ElementExtractor';
import { Matrix } from '../matrix/matrix.component';


@Component({
  selector: 'app-aggregation-matrix',
  templateUrl: './aggregation-matrix.component.html',
  styleUrls: [ './aggregation-matrix.component.scss' ],
  providers: [ AggregatorService ]
})
export class AggregationMatrixComponent {

  filterCategories = [
    { name: 'town', label: 'Town' },
    { name: 'library', label: 'Library' },
    { name: 'manuscript-type', label: 'Type of manuscript' },
    { name: 'commentator-name', label: 'Name of commentator' },
    { name: 'period', label: 'Period' },
    { name: 'affiliation', label: 'Affiliation' }
  ];
  filterForm = new FormGroup({
    xaxis: new FormControl(),
    yaxis: new FormControl()
  });
  dataMatrix: Matrix;
  private results: Commentator[];

  constructor(rs: ResultStreamerService,
              counter: AggregatorService) {
    counter.register(new TownsExtractor('town'))
      .register(new LibrariesExtractor('library'))
      .register(new ManuscriptTypeExtractor('manuscript-type'))
      .register(new CommentatorNameExtractor('commentator-name'))
      .register(new PeriodExtractor('period'))
      .register(new AffiliationsExtractor('affiliation'));

    this.filterForm.get('xaxis').disable();
    this.filterForm.get('yaxis').disable();

    rs.resultStream$.subscribe(res => {
      this.results = res;
      counter.aggregate(res);
      this.filterForm.get('xaxis').enable();
      this.filterForm.get('yaxis').enable();
    });

    this.filterForm.valueChanges.subscribe(formVals => {
      const localRes = this.results;
      counter.aggregate(localRes);
      if (formVals.xaxis && formVals.yaxis) {
        const xAxisFacets = counter.getType(formVals.xaxis, ValueShape.POINTERS, Sorting.ALPHABETICALLY);
        const yAxisLabels = counter.getType(formVals.yaxis, ValueShape.POINTERS, Sorting.ALPHABETICALLY).map(x => x.key);
        const matrix = new Matrix(xAxisFacets.map(x => x.key), yAxisLabels);
        for (const xFacet of xAxisFacets) {
          const facetValuesForX = (<number[]>xFacet.value).map(i => localRes[i]);
          counter.aggregate(facetValuesForX);
          matrix.addColumn(
            xFacet.key,
            counter.getType(formVals.yaxis, ValueShape.POINTERS, Sorting.ALPHABETICALLY)
              .map(x => ({key: x.key, value: (<number[]>x.value).map(y => facetValuesForX[y])})));
        }
        this.dataMatrix = matrix;
      }
    });
  }
}
