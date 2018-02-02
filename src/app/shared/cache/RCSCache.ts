export class RCSCache {
  private commentators: any;

  lookup(): any | null {
    return this.commentators ? { commentators: this.commentators } : null;
  }

  put(responseBody: any) {
    this.commentators = responseBody;
  }
}
