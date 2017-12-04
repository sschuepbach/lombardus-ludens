export interface Serialisable<T> {
  deserialise(input: any): T;
}
