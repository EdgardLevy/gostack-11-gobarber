import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    const response = await authUser.execute({
      email: 'email@provider.com.br',
      password: '123123',
    });

    await expect(response).toHaveProperty('token');
    await expect(response.user).toEqual(user);
  });

  it('should not be able authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await expect(
      authUser.execute({
        email: 'other@provider.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    await expect(
      authUser.execute({
        email: 'email@provider.com.br',
        password: '321321aaaaa',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
