import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appHistogram]'
})
export class HistogramDirective {

  @Input() height: number;
  @Input() width = 5;

  constructor() { }

  // @HostListener('')


}
