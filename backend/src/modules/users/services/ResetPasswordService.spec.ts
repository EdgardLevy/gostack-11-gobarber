import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../infra/typeorm/repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const newPassword = '321321';

    await resetPassword.execute({ password: newPassword, token });

    await expect(generateHash).toHaveBeenCalledWith(newPassword);
  });

  it('should not be to reset password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        password: '321321',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be to reset password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({ password: '321321', token }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be to reset password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await expect(
      resetPassword.execute({ password: '321321', token }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
