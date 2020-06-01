import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../infra/typeorm/repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able recover the password using the email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail');

    await fakeUsersRepository.create({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    await sendForgotPasswordEmailService.execute({
      to: 'email@provider.com.br',
      body: 'teste',
    });

    expect(sendEmail).toHaveBeenCalledWith('email@provider.com.br', 'teste');
  });

  it('should not be able recover a non-existing user password', async () => {
    expect(
      sendForgotPasswordEmailService.execute({
        to: 'email@provider.com.br',
        body: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    await sendForgotPasswordEmailService.execute({
      to: 'email@provider.com.br',
      body: 'teste',
    });

    // expect(sendEmail).toHaveBeenCalledWith('email@provider.com.br', 'teste');
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
