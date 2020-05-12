// import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointments';

// interface CreateAppointmentDTO {
//   provider: string;
//   date: Date;
// }
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // private appointments: Appointment[];

  // constructor() {
  //   this.appointments = [];
  // }

  // public create({ provider, date }: CreateAppointmentDTO): Appointment {
  //   const appointment = new Appointment({ provider, date });
  //   this.appointments.push(appointment);
  //   return appointment;
  // }

  public async findByDate(date: Date): Promise<Appointment | null> {
    // const findAppointment =
    //   this.appointments.find(appointment => isEqual(date, appointment.date)) ||
    //   null;

    const findAppointment = await this.findOne({ where: { date } });

    return findAppointment || null;
  }

  // public all(): Appointment[] {
  //   return this.appointments;
  // }
}

export default AppointmentsRepository;
