export class LoginViewModel {
  static toHTTP(token: string) {
    return `Bearer ${token}`;
  }
}
