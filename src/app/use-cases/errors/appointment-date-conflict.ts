export class AppointmentDateConflict extends Error {
  constructor() {
    super("Appointment conlficting to another's date.");
  }
}
