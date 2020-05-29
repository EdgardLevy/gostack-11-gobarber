import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRespository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { uuid } from 'uuidv4';

class FakeAppointmentsRepository implements IAppointmentsRespository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(appointment => appointment.date === date);
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, date });
    // appointment.id = uuid();
    // appointment.provider_id = provider_id;
    // appointment.date = date;
    this.appointments.push(appointment);
    return appointment;
  }
}

export default FakeAppointmentsRepository;
