import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const authUser = new AuthenticateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    const response = await authUser.execute({
      email: 'email@provider.com.br',
      password: '123123',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able authenticate with wrong email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const authUser = new AuthenticateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    expect(
      authUser.execute({
        email: 'other@provider.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const authUser = new AuthenticateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'User 1',
      email: 'email@provider.com.br',
      password: '123123',
    });

    expect(
      authUser.execute({
        email: 'email@provider.com.br',
        password: '321321aaaaa',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
