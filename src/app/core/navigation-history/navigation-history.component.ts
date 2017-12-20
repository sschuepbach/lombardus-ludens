import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

class Link {
  title: string;
  baseLink: string;
  linkParams: { [k: string]: any } = {};
  rawLink: string;
  opened = false;

  constructor(title: string, link: string, params: { [k: string]: any }, rawLink: string) {
    this.title = title;
    this.baseLink = link;
    this.linkParams = params;
    this.rawLink = rawLink;
  }
}

class Queue<T> {
  cache: T[] = [];
  size: number;

  constructor(size?: number) {
    this.size = size ? size : 0;
  }

  enqueue(token: T) {
    if (this.size > 0 && this.cache.length >= this.size) {
      this.cache.shift();
    }
    this.cache.push(token);
  }

  dequeue(index?: number) {
    index ? this.cache.splice(index, 1) : this.cache.shift();
  }

  asArray(): T[] {
    return this.cache;
  }

  length(): number {
    return this.cache.length;
  }

}

@Component({
  selector: 'app-navigation-history',
  templateUrl: './navigation-history.component.html',
  styleUrls: [ './navigation-history.component.scss' ]
})
export class NavigationHistoryComponent implements OnInit {

  linkHistory: Queue = new Queue<Link>(20);

  constructor(private route: ActivatedRoute, private router: Router) {
    router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const rawLink = event.urlAfterRedirects;
          const title = (rawLink.includes(';') ? rawLink.split(';')[ 0 ] : rawLink).substr(1);
          const params = rawLink
            .split(';')
            .slice(1)
            .reduce((x, y) => {
              x[ y.split('=')[ 0 ] ] = y.split('=')[ 1 ];
              return x;
            }, {});
          this.linkHistory.enqueue(new Link(title, title, params, rawLink));
        }
      }
    );
  }

  ngOnInit() {
  }

}
