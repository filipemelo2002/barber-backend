import { randomUUID } from 'crypto';

export interface CustomerProps {
  email: string;
  name: string;
  phone: string;
  password: string;
}

export class Customer {
  private _id: string;
  private props: CustomerProps;

  constructor(props: CustomerProps, id?: string) {
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
