import { Component, ElementRef, Input } from '@angular/core';

export class Matrix {

  private xLabelsArray: string[];
  private yLabelsArray: string[];
  private matrixArray: Array<Array<number>>;

  constructor(xLabels: string[], yLabels: string[]) {
    this.xLabelsArray = xLabels;
    this.yLabelsArray = yLabels;
    this.matrixArray = yLabels.map(yl => xLabels.map(x => 0));
  }

  addColumn(xLabel: string, facets: any[]) {
    const colPosition = this.xLabelsArray.indexOf(xLabel);
    if (colPosition > -1) {
      facets.forEach(facet => {
        const rowPosition = this.yLabelsArray.indexOf(facet.key);
        if (rowPosition > -1) {
          this.matrixArray[ rowPosition ][ colPosition ] = facet.value;
        }
      });
    } else {
      console.log('No such label on x-axis in matrix!');
    }
  }

  get matrix() {
    return this.matrixArray;
  }

  get xLabels(): string[] {
    return this.xLabelsArray;
  }

  get yLabels(): string[] {
    return this.yLabelsArray;
  }

}

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.html',
  styleUrls: [ './matrix.scss' ]
})
export class MatrixComponent {

  openPopover: any;

  @Input() dataMatrix: Matrix;

  constructor(private elRef: ElementRef) {
  }

  getNamesOfCommentators(v: any): string {
    return v.constructor === Array ? '<ul>' + v.reduce((x, y, i) => x + '<li>' + y.name + '</li>', '') + '</ul>' : '';
  }

  closePopup() {
    console.log(this.elRef.nativeElement.quer);
  }

  addPopover(p: any) {
    if (this.openPopover) {
      this.openPopover.close();
      if (this.openPopover === p) {
        this.openPopover = undefined;
      } else {
        p.open();
        this.openPopover = p;
      }
    } else {
      p.open();
      this.openPopover = p;
    }
  }

  closePopover() {
    this.openPopover.close();
    this.openPopover = undefined;
  }

}
