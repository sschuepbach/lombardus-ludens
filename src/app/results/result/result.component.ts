import { Component, Input } from '@angular/core';
import { Commentator } from '../../shared/models/commentator';
import { Item } from '../../shared/models/item';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: [ './result.component.scss' ]
})
export class ResultComponent {

  showManifestationsTracker: number[] = [];

  @Input() commentator: Commentator;

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
