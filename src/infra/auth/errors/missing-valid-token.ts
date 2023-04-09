export class MissingValidToken extends Error {
  constructor() {
    super('Missing valid token.');
  }
}
