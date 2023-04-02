import { randomUUID } from 'crypto';

export interface AppointmentProps {
  customerId: string;
  dueDate: Date;
  createdAt: Date;
  canceledAt?: Date | null;
}
export class Appointment {
  private _id: string;
  private props: AppointmentProps;

  constructor(props: AppointmentProps, id?: string) {
    this._id = id || randomUUID();
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get customerId() {
    return this.props.customerId;
  }

  public set customerId(customerId: string) {
    this.props.customerId = customerId;
  }

  public get dueDate() {
    return this.props.dueDate;
  }

  public set dueDate(dueDate: Date) {
    this.props.dueDate = dueDate;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }
}
