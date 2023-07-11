export class CustomerEmailAlreadyExists extends Error {
  constructor() {
    super('Customer with give Email already exists');
  }
}
