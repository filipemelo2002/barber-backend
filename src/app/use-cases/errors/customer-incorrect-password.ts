export class CustomerIncorrectPassword extends Error {
  constructor() {
    super('Customer incorrect password.');
  }
}
