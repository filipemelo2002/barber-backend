export class CustomerAlreadyExists extends Error {
  constructor() {
    super('Customer with give Email already exists');
  }
}
