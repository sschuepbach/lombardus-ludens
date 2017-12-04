import { Component, OnInit } from '@angular/core';
import { ResultStreamerService } from '../../shared/searchutils/result-streamer.service';
import { Commentator } from '../../shared/models/commentator';
import { Item } from '../../shared/models/item';

@Component({
  selector: 'app-resultlist',
  templateUrl: './resultlist.component.html'
})
export class ResultlistComponent implements OnInit {

  results: Commentator[];
  numberOfResults: number;
  showManifestationsTracker: number[] = [];

  constructor(private rs: ResultStreamerService) {
    rs.resultStream$.subscribe(res => {
      this.results = res;
      this.numberOfResults = res.length;
    });
  }

  ngOnInit() {
  }

  // noinspection JSUnusedLocalSymbols, JSMethodCanBeStatic
  trackByOid(index: number, commentator: Commentator) {
    return commentator.oid;
  }

  // noinspection JSMethodCanBeStatic
  createLinkToRCS(oid: number) {
    return 'http://rcs.philsem.unibas.ch/oid/' + oid.toString();
  }

  showManifestation(oid: number): boolean {
    return this.showManifestationsTracker.indexOf(oid) > -1;
  }

  toggleShowManifestation(oid: number): void {
    this.showManifestation(oid) ?
      this.showManifestationsTracker = this.showManifestationsTracker.filter(x => x !== oid) :
      this.showManifestationsTracker.push(oid);
  }

  markupToLink(description: string): string {
    return description
      .replace(/\[oid (\d+)]/g, (a, b) =>
        '<a href="' + this.createLinkToRCS(b) + '" target="_blank">')
      .replace(/\[\/oid]/g, '</a>');
  }

  // noinspection JSMethodCanBeStatic
  showItem(i: Item): string {
    return (i.location ? i.location : '') +
      (i.library ? ', ' + i.library : '') +
      (i.shelfmark ? ', ' + i.shelfmark : '');
  }
}
