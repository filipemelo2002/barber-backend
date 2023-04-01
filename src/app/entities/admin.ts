import { randomUUID } from 'crypto';

export interface AdminProps {
  email: string;
  name: string;
  phone: string;
  password: string;
}

export class Admin {
  private _id: string;
  private props: AdminProps;

  constructor(props: AdminProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get email() {
    return this.props.email;
  }

  public get name() {
    return this.props.name;
  }

  public get phone() {
    return this.props.phone;
  }

  public get password() {
    return this.props.password;
  }
}
