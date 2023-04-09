export class AdminIncorrectPassword extends Error {
  constructor() {
    super('Admin incorrect password.');
  }
}
