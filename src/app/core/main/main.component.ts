import { Component, OnInit } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  providers: [ NgbTabset ]
})
export class MainComponent implements OnInit {

  constructor(tabset: NgbTabset, private route: ActivatedRoute) {
    this.route.url.subscribe(u => {
      console.log(u);
      console.log(u[ 0 ][ 'path' ]);
      // tabset.select(u[0]['path']);
    });
  }

  ngOnInit() {
  }

}
