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

  public set id(id: string) {
    this._id = id;
  }
  public get email() {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get phone() {
    return this.props.phone;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public get password() {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }
}
