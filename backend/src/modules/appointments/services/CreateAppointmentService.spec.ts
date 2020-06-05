import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1',
    });

    await expect(appointment).toHaveProperty('id');
  });
  it('should not be able to create two appointment on the same time', async () => {
    const dateAppointment = new Date();

    await createAppointment.execute({
      date: dateAppointment,
      provider_id: '1',
    });

    await expect(
      createAppointment.execute({
        date: dateAppointment,
        provider_id: '2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
