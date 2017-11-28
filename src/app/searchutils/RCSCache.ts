interface Commentators {
  [index: string]: any;
}

interface RequestIndex {
  [index: string]: number[];
}

export class RCSCache {
  private commentators: Commentators = {};
  private requestIndex: RequestIndex = {};

  lookup(s: string): any | null {
    console.log(s);
    console.log(this.requestIndex);
    return this.requestIndex[ s ] ?
      { commentators: this.requestIndex[ s ].map(r => this.commentators[ r ]) } :
      null;
  }

  put(searchString: string, responseBody: any) {
    console.log('Called!');
    console.log(responseBody['commentators']);
    this.requestIndex[ searchString ] = [];
    responseBody[ 'commentators' ].forEach(r => {
      this.commentators[ r.oid ] = r;
      this.requestIndex[ searchString ].push(r.oid);
    });
  }
}
