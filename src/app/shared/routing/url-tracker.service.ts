import { Injectable } from '@angular/core';
import { NavigationEnd, Router, UrlSegment } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class UrlTrackerService {

  private urlParamsStreamContainer: { [name: string]: ReplaySubject<any> } = {};
  private currentFormValues = {};
  private currentUrlSegments: UrlSegment[];
  private currentUrlParams = {};
  private defaultFormValues = {};
  private formCategoryMembers: { [name: string]: Array<string> } = {};

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const parsedUrl = router.parseUrl(event.urlAfterRedirects);
        if (parsedUrl.root.hasChildren()) {
          this.currentUrlSegments = parsedUrl.root.children.primary.segments;
        }
        this.currentUrlParams = parsedUrl.queryParamMap[ 'params' ];
        Object.keys(this.formCategoryMembers).forEach(key => this.extractUrlParamsForCategory(key));
      }
    });
  }

  register(name: string, formModel: {}) {
    this.formCategoryMembers[ name ] = [];
    Object.keys(formModel).forEach(key => {
      this.formCategoryMembers[ name ].push(key);
      this.defaultFormValues[ key ] = formModel[ key ];
    });
    this.urlParamsStreamContainer[ name ] = new ReplaySubject<any>(1);
    // console.log(this.urlParamsStreamContainer);
    // console.log(this.currentFormValues);
    // console.log(this.currentUrlSegments);
    // console.log(this.defaultFormValues);
    // console.log(this.formCategoryMembers);
    // console.log(this.paramKeynameToFormKeynameMap);
  }

  track(name: string) {
    return this.urlParamsStreamContainer[ name ].asObservable();
  }

  propagate(formModel: any) {
    this.currentFormValues = Object.assign({}, this.currentFormValues, formModel);
    if (this.currentFormValues !== this.currentUrlParams) {
      // TODO: Transform currentFormValues to urlKeynames
      this.router.navigate(this.currentUrlSegments, this.currentFormValues);
      this.currentUrlParams = this.currentFormValues;
    }
  }

  private extractUrlParamsForCategory(name: string) {
    console.log(this.formCategoryMembers);
    console.log(this.defaultFormValues);
    const newUrlParamsForCategory = this.formCategoryMembers[ name ]
      .reduce((x, y) => {
        x[ y ] =
          this.currentUrlParams[ y ] ? this.currentUrlParams[ y ] : this.defaultFormValues[ y ];
        return x;
      }, {});
    if (newUrlParamsForCategory !== this.currentFormValues[ name ]) {
      console.log(this.currentFormValues[ name ]);
      console.log(newUrlParamsForCategory);
      this.urlParamsStreamContainer[ name ].next(newUrlParamsForCategory);
      this.currentFormValues = newUrlParamsForCategory;
    }
  }

  private static createChildObjectsFromDotPath(obj: any) {
    return Object.keys(obj).reduce((x, y) => {
      y.split('.').reduceRight((u, v) => {
        const tempObj = {};
        tempObj[v] = u;
        return tempObj;
      });
  }, {}); }

}
