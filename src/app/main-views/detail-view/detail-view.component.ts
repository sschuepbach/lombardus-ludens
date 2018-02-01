import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: [ './detail-view.component.scss' ]
})
export class DetailViewComponent {

  private oid: number;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(p => {
      this.oid = +p.id;
    });
  }

}
