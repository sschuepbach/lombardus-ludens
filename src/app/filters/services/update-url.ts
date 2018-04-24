import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class UpdateUrl {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  updateAffiliation(name: string) {
    this.route.snapshot.paramMap.has('affiliations') ?
      this.route.snapshot.paramMap.get('affiliations') : {};
    this.updateUrl(Object.assign(this.route.snapshot.paramMap));
  }

  updatePeriod(name: string) {
    this.route.snapshot.paramMap.has('periods') ?
      this.route.snapshot.paramMap
  }

  updateSearchTerm(value: string) {
    this.updateUrl({ searchTerm: value });
  }

  private updateUrl(newSearchParam: any) {
    const text = this.route.snapshot.paramMap.keys.map(x => {
        return { x: this.route.snapshot.paramMap.get(x) };
      })
    ;
    this.router.navigate([ this.route.pathFromRoot, Object.assign(this.route.snapshot.paramMap, newSearchParam) ]);
  }

  private getRouteParams(root: ActivatedRouteSnapshot) {
    root.children.flatMap(x => x.)
  }

}


