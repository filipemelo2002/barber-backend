export interface JWTAuthenticationServiceRequest {
  email: string;
  id: string;
  isAdmin: boolean;
}

export interface JWTAuthenticationServiceResponse {
  token: string;
}

export abstract class JWTAuthenticationService {
  abstract sign(
    request: JWTAuthenticationServiceRequest,
  ): Promise<JWTAuthenticationServiceResponse>;
}
